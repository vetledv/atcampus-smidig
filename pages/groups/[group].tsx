import FlatButton from 'components/buttons/FlatButton'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import MessageComponent from 'components/groups/MessageComponent'
import { postJSON, useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { dehydrate, QueryClient, useMutation } from 'react-query'
import Image from 'next/image'
import type { Group, Member } from 'types/groups'
import GroupNav from 'components/groups/GroupNav'

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
    const [activeMembers, setActiveMembers] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)

    const groupNavTabs = ['Generelt', 'Medlemmer', 'Chat', 'Kalender']

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

    const handlePendingMember = useCallback(
        async (userToAdd: Member, action: 'ADD' | 'REMOVE') => {
            const addMutateObj: AddMutateObj = {
                groupId: group.data._id,
                admin: group.data.admin,
                userToAdd,
                action,
            }
            adminMutatePending.mutateAsync(addMutateObj)
        },
        [adminMutatePending, group?.data?._id, group?.data?.admin]
    )

    const isAdmin = useCallback(() => {
        if (!session.data.user || !group.data) return false
        return session?.data?.user?.id === group.data?.admin.userId?.toString()
    }, [group, session])

    const renderAdminPanel = useCallback(() => {
        if (!isAdmin()) return null
        return (
            <div className='flex flex-col gap-2'>
                <h1>Pending members:</h1>
                {group.data.pendingMembers.map((pendingMember) => (
                    <div
                        key={pendingMember.userId.toString()}
                        className='flex flex-row gap-2'>
                        <div>{pendingMember.userName}</div>
                        <div className='flex gap-2'>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'ADD')
                                }}>
                                Add to group
                            </FlatButton>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'REMOVE')
                                }}>
                                Decline
                            </FlatButton>
                        </div>
                    </div>
                ))}
                {group.data.pendingMembers.length === 0 && (
                    <div>No pending members</div>
                )}
            </div>
        )
    }, [group.data?.pendingMembers, handlePendingMember, isAdmin])

    if (group.isLoading || adminMutatePending.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error: {group.error.message}</div>
    }

    return (
        <>
            {group.data && (
                <>
                    <GroupHeader
                        group={group.data}
                        activeMembers={activeMembers}
                    />
                    <GroupNav
                        tabs={groupNavTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className='grid h-full min-h-screen grid-cols-1 bg-gray-50 p-4 lg:grid-cols-4'>
                        {activeTab === 0 && (
                            <div className='col-span-1 lg:col-span-3'>
                                <div className='flex flex-col gap-2'>
                                    <p>{group.data.description}</p>
                                    <h1>Tags:</h1>
                                    {group.data.tags?.map((tag) => (
                                        <div
                                            className='bg-pink-300 rounded-md w-fit px-4'
                                            key={tag}>
                                            {tag}
                                        </div>
                                    ))}

                                    {group.data.admin?.userId && (
                                        <div>
                                            <span className='font-semibold'>
                                                Admin:{' '}
                                            </span>
                                            {group.data.admin.userName}
                                        </div>
                                    )}
                                    {renderAdminPanel()}
                                </div>
                            </div>
                        )}
                        {activeTab === 1 && (
                            <div className='flex flex-col gap-2 bg-red-300'>
                                {group.data.members?.map((member) => (
                                    <div
                                        key={member.userId.toString()}
                                        className='flex flex-row gap-2'>
                                        <Image
                                            src={member.picture}
                                            alt=''
                                            width={48}
                                            height={48}
                                            className='rounded-full'
                                        />
                                        <div className='flex flex-col'>
                                            <div className='font-semibold'>
                                                {member.userName}
                                            </div>
                                            {member.userId ===
                                            group.data.admin?.userId ? (
                                                <div className='italic'>
                                                    Admin
                                                </div>
                                            ) : (
                                                <div className='italic'>
                                                    Gruppemedlem
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className='col-span-1 lg:col-span-3'>
                                <MessageComponent
                                    groupId={group.data._id}
                                    groupName={group.data.groupName}
                                    groupMembers={group.data.members}
                                    setActiveMembers={setActiveMembers}
                                />
                            </div>
                        )}
                        {activeTab === 3 && <>Not Implemented yet.</>}
                    </div>
                </>
            )}
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
