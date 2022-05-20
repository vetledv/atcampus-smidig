import FlatButton from 'components/buttons/FlatButton'
import { group } from 'console'
import { fetchReactQuery, postJSON } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query'
import SocketIOClient, { Socket } from 'socket.io-client'
import type { GroupMessages, SendMessage } from 'types/groups'

const MessageComponent = ({
    groupName,
    groupId,
}: {
    groupId: ObjectId
    groupName: string
}) => {
    const session = useSession()
    const messages = useQuery<GroupMessages, Error>(
        ['messages', groupId],
        fetchReactQuery(`groups/messages/${groupId}`)
    )
    const [msg, setMsg] = useState<string>('')
    const [connected, setConnected] = useState<boolean>(false)
    const [activeMembers, setActiveMembers] = useState<number>(0)
    const socket = useRef<Socket>()
    const msgCont = useRef<HTMLDivElement>(null)

    const refetch = useCallback(() => {
        messages?.refetch()
    }, [messages])
    const scrollToBot = () => {
        msgCont.current.scrollTop = msgCont.current.scrollHeight
    }

    useEffect(() => {
        if (!!session.data.user) {
            socket.current = SocketIOClient(process.env.NEXTAUTH_URL, {
                path: '/api/groups/socket',
                query: {
                    room: groupId,
                    userId: session.data.user.id,
                },
            })

            socket.current.on('connect', () => {
                console.log('socket connected, id:', socket.current.id)
                //join a room
                socket.current.emit('create', groupId)
                socket.current.emit('active', groupId)
                setConnected(true)
            })

            const currSocket = socket.current
            return () => {
                console.log('socket disconnected')
                currSocket.close()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!socket.current) return
        socket.current.on('disconnect', () => {
            socket.current.emit('leave', groupId)
            socket.current.emit('active', groupId)
            console.log('socket disconnected')
            setConnected(false)
            //leave a room
        })
        socket.current.on('active-members', (data) => {
            console.log('active:', data)
            setActiveMembers(data)
        })
        socket.current.on(`message ${groupId}`, (message) => {
            console.log('message received:', message)
            socket.current.emit('active', groupId)
            refetch()
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        messages.data && msgCont.current && scrollToBot()
    }, [messages.data])

    const handleSendMessage = () => {
        if (msg.length > 0) {
            const message: SendMessage = {
                userId: session?.data?.user?.id,
                userName: session?.data?.user?.name,
                message: msg,
                groupName: groupName,
                groupId: messages.data?.groupId,
            }
            postJSON(`/api/groups/messages/${message.groupId}`, message)
            setMsg('')
        }
    }
    if (messages.isLoading) {
        return <div>Loading...</div>
    }
    if (messages.isError) {
        return <div>Error</div>
    }
    //why no work
    //${msgCont.current.scrollTop > 200 ? 'bg-pink-400' : ''}
    return (
        <div className='flex flex-col gap-2 w-fit'>
            <h1 className='font-semibold'>Messages</h1>
            <div>Active members: {activeMembers}</div>
            <button
                onClick={() => {
                    console.log(socket.current.id)
                    socket.current.emit('active', groupId)
                }}>
                emit
            </button>
            <div className={' bg-white rounded-lg p-2 gap-2 flex flex-col'}>
                <div
                    ref={msgCont}
                    className={` flex flex-col h-72 max-w-sm overflow-y-scroll gap-1`}>
                    {messages.data?.messages?.map((message, i) => (
                        <div
                            key={i}
                            className='flex flex-col bg-slate-50 p-2 rounded gap-2'>
                            <div>
                                {message.from.userName}
                                {': '}
                                {message.message}
                            </div>
                            <div className='italic text-dark-4 flex flex-row-reverse'>
                                {new Date(message.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex gap-2'>
                    <input
                        value={msg}
                        placeholder={
                            connected ? 'Type a message...' : 'Connecting...'
                        }
                        disabled={!connected}
                        className='px-4 border-[1px] border-gray-300 rounded w-full'
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
        </div>
    )
}

export default MessageComponent
