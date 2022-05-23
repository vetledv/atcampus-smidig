import FlatButton from 'components/buttons/Button'
import { baseUrl } from 'lib/constants'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import {
    dehydrate,
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import { Group } from 'types/groups'
import { fetchReactQuery, postJSON, postReactQuery } from '../hooks/useGroups'

interface MutateResponse {
    message: string
    private: boolean
}

interface MutateError {
    error: {
        message: string
    }
    message: string
}

const TestPageJoinGroup = () => {
    const session = useSession()
    const groups = useQuery<Group[], Error>(
        'groupstest',
        fetchReactQuery('testjoingroup')
    )
    const [mutateRes, setMutateRes] = useState<MutateResponse>()
    const mutate = useMutation(
        (userInfo: any) => postReactQuery(`/api/testjoingroup`, userInfo),
        {
            onSuccess: async (data: MutateResponse, vars, ctx) => {
                console.log('success')
                console.log(data, vars, ctx)
                console.log(data)
                groups.refetch()
            },
            onSettled: (data: MutateResponse, error, vars, ctx) => {
                console.log('settled')
                console.log(data, error, vars, ctx)
                setMutateRes(data)
                console.log('mutateRes', mutateRes)
            },
            onError: (error, vars, ctx) => {
                console.log('error')
                console.log(error, vars, ctx)
            },
        }
    )
    const handleJoin = async (group: Group) => {
        mutate.mutateAsync({
            groupId: group._id,
            userId: session?.data?.user?.id,
            userName: session?.data?.user?.name,
            picture: session?.data?.user?.image,
            isPrivate: group.private,
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
                                    <div className='bg-pink-400 p-2'>
                                        Invite pending
                                    </div>
                                ) : (
                                    <>
                                        {group.members.find(
                                            (member) =>
                                                session?.data?.user?.id ===
                                                member.userId
                                        ) ? (
                                            <div className='bg-pink-400 p-2'>
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
            {mutate.isSuccess && (
                <div>
                    {mutateRes.private ? (
                        <h1>{mutateRes.message}</h1>
                    ) : (
                        <h1>Joined</h1>
                    )}
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
