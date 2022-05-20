import FlatButton from 'components/buttons/FlatButton'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import MessageComponent from 'components/groups/MessageComponent'
import { fetchReactQuery, postJSON, useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import type { Group, GroupMessages, Member } from 'types/groups'

interface AddMutateObj {
    groupId: ObjectId
    admin: Member
    userToAdd: Member
    action: 'ADD' | 'REMOVE'
}

const GroupPage = () => {
    const router = useRouter()
    const routerQuery = router.query
    const session = useSession()

    const group = useGroup(routerQuery.group as string)

    const adminMutatePending = useMutation(
        (object: AddMutateObj) =>
            postJSON(`/api/groups/handlependingmembers`, object),
        {
            onSuccess: () => {
                console.log('success')
                group.refetch()
            },
            onError: (err) => {
                console.log(err)
            },
        }
    )

    // const refetchMsg = () => {
    //     console.log('DEEEZ')
    //     messages.refetch()
    // }

    const handlePendingMember = async (
        userToAdd: Member,
        action: 'ADD' | 'REMOVE'
    ) => {
        const addMutateObj: AddMutateObj = {
            groupId: group.data._id,
            admin: group.data.admin,
            userToAdd: userToAdd,
            action: action,
        }
        adminMutatePending.mutateAsync(addMutateObj)
    }

    if (group.isLoading || adminMutatePending.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error: {group.error.message}</div>
    }

    const isAdmin =
        session?.data?.user?.id === group.data?.admin.userId?.toString()

    return (
        <>
            {group.data && (
                <div className='flex flex-col gap-2'>
                    <GroupHeader group={group.data} />
                    <div className='flex gap-2 items-baseline'>
                        <h1 className='font-semibold text-lg'>
                            {group.data.groupName}
                        </h1>
                        <span>
                            {group.data.members?.length}
                            {'/'}
                            {group.data.maxMembers}
                        </span>
                    </div>
                    <p>{group.data.description}</p>

                    <h1>Tags:</h1>
                    {group.data.tags?.map((tag) => (
                        <div
                            className='bg-pink-300 rounded-md w-fit px-4'
                            key={tag}>
                            {tag}
                        </div>
                    ))}
                    <div>
                        <h1>Members</h1>
                        {group.data.members?.map((member) => (
                            <div
                                key={member.userId.toString()}
                                className='flex flex-col gap-2'>
                                <div>{member.userName}</div>
                            </div>
                        ))}
                    </div>
                    {group.data.admin?.userId && (
                        <div>
                            <span className='font-semibold'>Admin: </span>
                            {group.data.admin.userName}
                        </div>
                    )}
                    <div>
                        {isAdmin && (
                            <div className='flex flex-col gap-2'>
                                <h1>Pending members:</h1>
                                {group.data.pendingMembers.length > 0 ? (
                                    <>
                                        {group.data.pendingMembers.map(
                                            (pendingMember) => (
                                                <div
                                                    key={pendingMember.userId.toString()}
                                                    className='flex flex-row gap-2'>
                                                    <div>
                                                        {pendingMember.userName}
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <FlatButton
                                                            onClick={() => {
                                                                handlePendingMember(
                                                                    pendingMember,
                                                                    'ADD'
                                                                )
                                                            }}>
                                                            Add to group
                                                        </FlatButton>
                                                        <FlatButton
                                                            onClick={() => {
                                                                handlePendingMember(
                                                                    pendingMember,
                                                                    'REMOVE'
                                                                )
                                                            }}>
                                                            Decline
                                                        </FlatButton>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <div>No pending members</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <MessageComponent
                groupId={group.data._id}
                groupName={group.data.groupName}
            />
        </>
    )
}

export async function getServerSideProps(context: {
    query: { group: string }
}) {
    const { group } = context.query
    console.log(group)
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group, Error>(
        ['group', group],
        async () => {
            const res = await fetch(`${baseUrl}/api/groups`)
            const data = await res.json()
            return data
        }
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default GroupPage
