import FlatButton from 'components/buttons/FlatButton'
import { fetchReactQuery, postJSON } from 'hooks/useGroups'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
    Dispatch,
    KeyboardEvent,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useQuery } from 'react-query'
import { Socket } from 'socket.io-client'
import { GroupMessages, Member, Message, SendMessage } from 'types/groups'

interface ByDayMessage {
    day: string
    messages: Message[]
}

const MessageComponent = ({
    groupId,
    groupName,
    groupMembers,
    connected,
    socket,
    activeTab,
    userTyping,
    setUserTyping,
}: {
    groupId: ObjectId
    groupName: string
    groupMembers: Member[]
    connected: boolean
    socket: MutableRefObject<Socket>
    activeTab: number
    userTyping: string
    setUserTyping: Dispatch<SetStateAction<string>>
}) => {
    const session = useSession()
    const messages = useQuery<GroupMessages, Error>(
        ['messages', groupId],
        fetchReactQuery(`groups/${groupId}/messages`)
    )
    const [msg, setMsg] = useState<string>('')

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
    useEffect(() => {
        socket.current.on(`message ${groupId.toString()}`, (message) => {
            console.log('message received:', message)
            refetch()
        })
        socket.current.on(`typing`, (data, user: string) => {
            console.log('typing:', data, 'user: ', user)
            if (activeTab === 2) {
                setUserTyping(user)
            }
        })
        socket.current.on(`stopped-typing`, (data, user) => {
            console.log('stopped typing:', data, 'user: ', user)
            if (activeTab === 2) {
                setUserTyping('')
            }
        })
    })

    useEffect(() => {
        scrollToBottom()
    }, [messages.data, scrollToBottom])

    const handleUserTyping = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (!socket.current) return
            if (
                e.key === 'Enter' ||
                e.key === 'Backspace' ||
                e.key === 'Delete' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowDown' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Tab' ||
                e.key === 'Control' ||
                e.key === 'Shift' ||
                e.key === 'Alt'
            ) {
                return
            }
            const typingTimeout = setTimeout(() => {
                socket.current.emit(
                    `stopped-typing`,
                    groupId,
                    session?.data.user?.name
                )
            }, 4000)
            socket.current.emit(`typing`, groupId, session?.data.user?.name)
            timeout.current && clearTimeout(timeout.current as NodeJS.Timeout)
            timeout.current = typingTimeout as NodeJS.Timeout
        },
        [groupId, session?.data.user?.name, socket]
    )

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
            socket,
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
                            className='flex bg-purple-5 p-2 rounded gap-2'>
                            <div className='w-14'>
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
                                            className='rounded-full'
                                        />
                                    </div>
                                ) : (
                                    <div className='h-12 w-12 rounded-full border-2 bg-white items-center flex justify-center font-semibold'>
                                        {message.from.userName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col w-2/3'>
                                <div className='flex flex-row gap-2'>
                                    {groupMembers.filter(
                                        (m) => m.userId === message.from.userId
                                    ).length > 0 ? (
                                        <div className='font-semibold text-dark-1'>
                                            {
                                                groupMembers.filter(
                                                    (m) =>
                                                        m.userId ===
                                                        message.from.userId
                                                )[0].userName
                                            }
                                        </div>
                                    ) : (
                                        <div className='flex gap-2  '>
                                            <div className=' text-dark-3 flex gap-2 font-semibold'>
                                                {message.from.userName}
                                            </div>
                                            <div className='italic text-sm text-dark-3 mt-auto'>
                                                Left
                                            </div>
                                        </div>
                                    )}
                                    <div className='italic text-dark-4 flex flex-grow'>
                                        {new Date(
                                            message.timestamp
                                        ).toLocaleTimeString('no-NO', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                                <div className='text-dark-1 text-md'>
                                    {message.message}
                                </div>
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
        <div className='  gap-2 flex flex-col'>
            <div
                ref={msgCont}
                className=' flex flex-col h-[500px] overflow-y-auto gap-1'>
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
                        handleUserTyping(e)
                    }}></input>
                <FlatButton
                    disabled={!connected}
                    onClick={() => sendMessage(msg)}>
                    Send
                </FlatButton>
            </div>
            {userTyping && <div>{userTyping} is typing...</div>}
        </div>
    )
}

export default MessageComponent
