import FlatButton from 'components/general/FlatButton'
import { fetchReactQuery, postJSON } from 'hooks/useGroups'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
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
import MessageItem from './MessageItem'

interface ByDayMessage {
    day: Date
    messages: Message[]
}

const MessagesWrapper = ({
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
        if (!socket.current) return
        socket.current.on(`message ${groupId.toString()}`, (message) => {
            setUserTyping('')
            refetch()
        })
        socket.current.on(`typing`, (data, user: string) => {
            console.log('typing:', data, 'user: ', user)
            if (activeTab === 2) {
                setUserTyping(user)
            }
        })
        socket.current.on(`stopped-typing`, (data, user) => {
            console.log(
                'stopped typing messagecomponent:',
                data,
                'user: ',
                user
            )
            if (activeTab === 2) {
                setUserTyping('')
            }
        })
    }, [activeTab, groupId, refetch, setUserTyping, socket])

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
            const day = new Date(message.timestamp)
            const index = messagesByDay.findIndex(
                (m) =>
                    m.day.getFullYear() === day.getFullYear() &&
                    m.day.getMonth() === day.getMonth() &&
                    m.day.getDate() === day.getDate()
            )
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
                <div key={day.day.getTime()} className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-dark-5 w-full h-[1px]'></div>
                        {day.day.toLocaleDateString() ===
                        new Date().toLocaleDateString() ? (
                            <div className='font-semibold text-dark-4 text-sm text-center'>
                                Today
                            </div>
                        ) : (
                            <div className='font-semibold text-dark-4 text-sm'>
                                {day.day.toLocaleDateString()}
                            </div>
                        )}
                        <div className='bg-dark-5 w-full h-[1px]'></div>
                    </div>
                    {day.messages.map((message: Message, j) => (
                        <MessageItem
                            key={j}
                            message={message}
                            groupMembers={groupMembers}
                        />
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

export default MessagesWrapper
