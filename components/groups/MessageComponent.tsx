import FlatButton from 'components/buttons/FlatButton'
import { group } from 'console'
import { fetchReactQuery, postJSON } from 'hooks/useGroups'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useQuery } from 'react-query'
import SocketIOClient, { Socket } from 'socket.io-client'
import type { GroupMessages, Member, Message, SendMessage } from 'types/groups'

interface ByDayMessage {
    day: string
    messages: Message[]
}

const MessageComponent = ({
    groupName,
    groupId,
    setActiveMembers,
    groupMembers,
}: {
    groupId: ObjectId
    groupName: string
    groupMembers: Member[]
    setActiveMembers: Dispatch<SetStateAction<number>>
}) => {
    const session = useSession()
    const messages = useQuery<GroupMessages, Error>(
        ['messages', groupId],
        fetchReactQuery(`groups/messages/${groupId}`)
    )
    const [msg, setMsg] = useState<string>('')
    const [connected, setConnected] = useState<boolean>(false)
    const [userTyping, setUserTyping] = useState<string>('')

    const socket = useRef<Socket>()
    const msgCont = useRef<HTMLDivElement>(null)
    const timeout: { current: NodeJS.Timeout | null } = useRef(null)

    const scrollToBottom = useCallback(() => {
        if (msgCont.current) {
            msgCont.current.scrollTop = msgCont.current.scrollHeight
        }
    }, [])

    const refetch = useCallback(() => {
        messages.refetch()
    }, [messages])

    //initialize socket
    useEffect(() => {
        socket.current = SocketIOClient(process.env.NEXTAUTH_URL, {
            path: '/api/groups/socket',
            query: {
                room: groupId,
            },
        })
        socket.current.on('connect', () => {
            console.log('socket connected, id:', socket.current.id)
            //join a room
            socket.current.emit('create', groupId)
            socket.current.emit('active', groupId)
            console.log('joined room')
            setConnected(true)
        })
        const currSocket = socket.current
        return () => {
            currSocket.emit('leave', groupId)
            socket.current.emit('active', groupId)
            currSocket.close()
            setConnected(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //socket events
    useEffect(() => {
        if (!socket.current) return
        socket.current.on('active-members', (data) => {
            console.log('active:', data)
            setActiveMembers(data)
        })
        socket.current.on(`message ${groupId.toString()}`, (message) => {
            console.log('message received:', message)
            socket.current.emit('active', groupId)
            refetch()
        })
        socket.current.on(
            `typing ${groupId.toString()}`,
            (data, user: string) => {
                console.log('typing:', data, 'user: ', user)
                setUserTyping(user)
            }
        )
        socket.current.on(
            `stopped-typing ${groupId.toString()}`,
            (data, user) => {
                console.log('stopped typing:', data, 'user: ', user)
                setUserTyping('')
            }
        )
        socket.current.on('disconnect', () => {
            socket.current.emit('leave', groupId)
            socket.current.emit('active', groupId)
            console.log('socket disconnected')
            setConnected(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages.data, scrollToBottom])

    const handleUserTyping = useCallback(() => {
        if (!socket.current) return

        const typingTimeout = setTimeout(() => {
            socket.current.emit(
                `stopped-typing ${groupId}`,
                groupId,
                session?.data.user?.name
            )
        }, 4000)
        socket.current.emit(
            `typing ${groupId}`,
            groupId,
            session?.data.user?.name
        )
        timeout.current && clearTimeout(timeout.current as NodeJS.Timeout)
        timeout.current = typingTimeout as NodeJS.Timeout
    }, [groupId, session?.data.user?.name])

    const sendMessage = useCallback(
        (message: string) => {
            if (session.status === 'authenticated' && msg.length > 0) {
                const msgData: SendMessage = {
                    userId: session.data.user.id,
                    userName: session.data.user.name,
                    message: message,
                    groupName,
                    groupId,
                }
                postJSON(`/api/groups/messages/${groupId}`, msgData)
                socket.current.emit(`message ${groupId}`, msgData)
                setMsg('')
                if (timeout.current) {
                    console.log('clearing timeout')
                    clearTimeout(timeout.current as NodeJS.Timeout)
                    socket.current.emit(
                        `stopped-typing ${groupId}`,
                        groupId,
                        session?.data.user?.name
                    )
                }
            }
        },
        [
            groupId,
            groupName,
            msg.length,
            session.data.user.id,
            session.data.user.name,
            session.status,
        ]
    )

    const messagesByDay = useMemo(() => {
        let messagesByDay: ByDayMessage[] = []
        if (!messages.data) return messagesByDay
        messages.data.messages.forEach((message) => {
            const day = new Date(message.timestamp).toLocaleDateString()
            const index = messagesByDay.findIndex((m) => m.day === day)
            if (index === -1) {
                messagesByDay.push({
                    day,
                    messages: [message],
                })
            } else {
                messagesByDay[index].messages.push(message)
            }
        })
        console.log('messagesByDay:', messagesByDay)
        return messagesByDay
    }, [messages.data])

    const renderMessages = useCallback(() => {
        if (messagesByDay.length === 0) return <div>Ingen meldinger.</div>
        return messagesByDay.map((day) => {
            return (
                <div key={day.day} className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-dark-5 w-full h-[1px]'></div>
                        {day.day === new Date().toLocaleDateString() ? (
                            <div className='font-semibold text-dark-4 text-sm text-center'>
                                Today
                            </div>
                        ) : (
                            <div className='font-semibold text-dark-4 text-sm'>
                                {day.day}
                            </div>
                        )}
                        <div className='bg-dark-5 w-full h-[1px]'></div>
                    </div>
                    {day.messages.map((message: Message, j) => (
                        <div
                            key={j}
                            className='flex bg-slate-50 p-2 rounded gap-2'>
                            {groupMembers.find(
                                (member) =>
                                    member.userId === message.from.userId
                            )?.picture ? (
                                <div className='border-2 rounded-full w-12 h-12'>
                                    <Image
                                        src={
                                            groupMembers.find(
                                                (member) =>
                                                    member.userId ===
                                                    message.from.userId
                                            )?.picture
                                        }
                                        alt=''
                                        width={48}
                                        height={48}
                                        className='rounded-full '
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div className='flex flex-col'>
                                <div className='flex flex-row gap-2'>
                                    <div className='font-semibold'>
                                        {message.from.userName}
                                    </div>
                                    <div className='italic text-dark-4 flex flex-row-reverse'>
                                        {new Date(
                                            message.timestamp
                                        ).toLocaleTimeString('no-NO', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                                <div>{message.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        })
    }, [groupMembers, messagesByDay])

    if (messages.isLoading) {
        return <div>Loading...</div>
    }
    if (messages.isError) {
        return <div>Error</div>
    }
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className={' bg-white rounded-lg p-2 gap-2 flex flex-col'}>
                <div
                    ref={msgCont}
                    className={` flex flex-col h-96 overflow-y-scroll gap-1`}>
                    <>{renderMessages()}</>
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
                                sendMessage(msg)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter') {
                                handleUserTyping()
                            }
                        }}></input>
                    <FlatButton
                        disabled={!connected}
                        onClick={() => sendMessage(msg)}>
                        Send
                    </FlatButton>
                </div>
                {userTyping && <div>{userTyping} is typing...</div>}
            </div>
        </div>
    )
}

export default MessageComponent
