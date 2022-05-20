import FlatButton from 'components/buttons/Button'
import { baseUrl } from 'lib/constants'
import { useSession } from 'next-auth/react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import { Group } from 'types/groups'
import { fetchReactQuery, postJSON } from '../hooks/useGroups'

const TestPageJoinGroup = () => {
    const session = useSession()
    const groups = useQuery<Group[], Error>(
        'groupstest',
        fetchReactQuery('testjoingroup')
    )
    const mutate = useMutation(
        (userInfo: any) => postJSON(`/api/testjoingroup`, userInfo),
        {
            onSuccess: () => {
                console.log('success')
                groups.refetch()
            },
        }
    )
    const handleJoin = async (group: Group) => {
        mutate.mutateAsync({
            groupId: group._id,
            userId: session?.data?.user?.id,
            userName: session?.data?.user?.name,
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
                                <FlatButton onClick={() => handleJoin(group)}>
                                    {ozuisdrg(group)}
                                </FlatButton>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {mutate.isSuccess && (
                <div>
                    <h1>Joined</h1>
                </div>
            )}
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
