import FlatButton from 'components/buttons/Button'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import { Group } from 'types/groups'
import { fetchReactQuery, postJSON } from '../hooks/useGroups'
import { Member } from './../types/groups'

const TestPageJoinGroup = () => {
    const session = useSession()
    const groups = useQuery<Group[], Error>(
        'groupstest',
        fetchReactQuery('mongo')
    )
    const mutate = useMutation((userInfo: any) =>
        postJSON(`/api/testjoingroup`, userInfo)
    )
    let userId = null
    let userName = null
    if (session.status === 'authenticated') {
        userId = session.data.user.id
        userName = session.data.user.name
    }
    mutate.isSuccess && groups.refetch()

    if (mutate.isLoading) {
        return <div>Loading...</div>
    }

    if (groups.isLoading) {
        return <div>Loading...</div>
    }
    if (groups.isError) {
        return <div>Error</div>
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
                                <FlatButton
                                    onClick={() => {
                                        mutate.mutateAsync({
                                            groupId: group._id,
                                            userId: userId,
                                            userName: userName,
                                        })
                                    }}>
                                    {group?.members?.filter(
                                        (member) => member.userId === userId
                                    ).length != 0
                                        ? 'Joined'
                                        : 'Join'}
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
        const res = await fetch(`${baseUrl}/api/mongo`)
        const data = await res.json()
        return data
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
