import FlatButton from 'components/buttons/FlatButton'
import { fetchReactQuery, postJSON, useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import SocketIOClient from 'socket.io-client'
import { useEffect, useState } from 'react'
import type { Group, GroupMessages, Member, SendMessage } from 'types/groups'
import { ObjectID } from 'bson'

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
    const messages = useQuery<GroupMessages, Error>(
        ['messages', group.data?._id],
        fetchReactQuery(`groups/messages/${group.data?._id}`)
    )
    const mutate = useMutation(
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
        mutate.mutateAsync(addMutateObj)
    }

    const [msg, setMsg] = useState<string>('')
    const [connected, setConnected] = useState<boolean>(false)

    useEffect(() => {
        const socket = SocketIOClient(process.env.NEXTAUTH_URL, {
            path: '/api/groups/socket',
        })
        socket.on('connect', () => {
            console.log('socket connected, id:', socket.id)
            setConnected(true)
        })
        socket.on('disconnect', () => {
            setConnected(false)
        })
        socket.on('message', (msg) => {
            messages.refetch()
        })
        return () => {
            socket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSendMessage = () => {
        if (msg.length > 0) {
            const message: SendMessage = {
                userId: session?.data?.user?.id,
                userName: session?.data?.user?.name,
                message: msg,
            }
            postJSON(`/api/groups/messages/${group.data?._id}`, message)
            setMsg('')
        }
    }

    if (group.isLoading || mutate.isLoading) {
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

            {messages.data && (
                <div className='flex flex-col gap-2 w-fit'>
                    <h1 className='font-semibold'>Messages</h1>
                    {messages.data.messages?.map((message, i) => (
                        <div key={i} className='flex bg-pink-400 gap-2'>
                            <div>
                                {message.from.userName}
                                {':'}
                            </div>
                            <div>
                                {new Date(message.timestamp).toLocaleString()}
                            </div>
                            <div>{message.message}</div>
                        </div>
                    ))}
                    <div className='flex gap-2'>
                        <input
                            value={msg}
                            placeholder={
                                connected
                                    ? 'Type a message...'
                                    : 'Connecting...'
                            }
                            disabled={!connected}
                            className='px-4 border-[1px] border-gray-300 rounded'
                            onChange={(e) => {
                                setMsg(e.target.value)
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage()
                                }
                            }}></input>
                        <FlatButton
                            disabled={!connected}
                            onClick={() => handleSendMessage()}>
                            Send
                        </FlatButton>
                    </div>
                </div>
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
