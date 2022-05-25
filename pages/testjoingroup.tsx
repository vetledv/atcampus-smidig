import FlatButton from 'components/buttons/Button'
import { baseUrl } from 'lib/constants'
import { useSession } from 'next-auth/react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import { Group } from 'types/groups'
import { fetchReactQuery, postReactQuery } from '../hooks/useGroups'

interface MutateResponse {
    message: string
}

const TestPageJoinGroup = () => {
    const session = useSession()
    const groups = useQuery<Group[], Error>(
        'groupstest',
        fetchReactQuery('testjoingroup')
    )
    const mutate = useMutation(
        (userInfo: any) => postReactQuery(`/api/testjoingroup`, userInfo),
        {
            onSuccess: async (data: MutateResponse) => {
                groups.refetch()
            },
            onSettled: (data: MutateResponse) => {
                mutate.data = data
            },
        }
    )
    const handleJoin = async (group: Group) => {
        mutate.mutateAsync({
            groupId: group._id,
            userId: session?.data?.user?.id,
            userName: session?.data?.user?.name,
            picture: session?.data?.user?.image,
        })
    }

    if (groups.isLoading || mutate.isLoading) {
        return <div>Loading...</div>
    }
    if (groups.isError) {
        return <div>Error</div>
    }

    const ozuisdrg = (group: Group) => {
        if (
            group.members.find(
                (member) => member.userId === session?.data?.user?.id
            )
        ) {
            return 'Joined'
        } else return 'Join'
    }

    return (
        <>
            {groups.data && (
                <div>
                    <h1>Groups</h1>
                    <ul>
                        {groups.data.map((group) => (
                            <li
                                key={group.groupName}
                                className={'p-4 flex gap-2'}>
                                <div>{group.groupName}</div>
                                {group.pendingMembers.find(
                                    (member) =>
                                        member.userId ===
                                        session?.data?.user?.id
                                ) ? (
                                    <div className='bg-pink-400 p-2 rounded-md text-stone-100 text-[18px] font-semibold'>
                                        Invite pending...
                                    </div>
                                ) : (
                                    <>
                                        {group.members.find(
                                            (member) =>
                                                session?.data?.user?.id ===
                                                member.userId
                                        ) ? (
                                            <div className='bg-purple-500 p-2 rounded-md text-stone-100 text-[18px] font-semibold'>
                                                In Group
                                            </div>
                                        ) : (
                                            <FlatButton
                                                onClick={() =>
                                                    handleJoin(group)
                                                }>
                                                {ozuisdrg(group)}
                                            </FlatButton>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {mutate.isSuccess && <div>{mutate?.data?.message}</div>}
        </>
    )
}

export default TestPageJoinGroup

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('groupstest', async () => {
        const res = await fetch(`${baseUrl}/api/testjoingroup`)
        const data = await res.json()
        return data
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
