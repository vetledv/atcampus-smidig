import FlatButton from 'components/general/FlatButton'
import { postJSON } from 'hooks/useGroups'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import {
    Dispatch,
    KeyboardEvent,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useInfiniteQuery } from 'react-query'
import { Socket } from 'socket.io-client'
import { Member, Message, SendMessage } from 'types/groups'
import MessageItem from './MessageItem'

interface ByDayMessage {
    day: Date
    messages: Message[]
}

interface InfMessages {
    messages: Message[]
    next: number | null
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

    const fetchData = async ({ pageParam = 1 }) => {
        const response = await fetch(
            `/api/groups/${groupId}/messages?page=` + pageParam
        )
        const data = await response.json()
        return data
    }
    const query = useInfiniteQuery<InfMessages, Error>('messages', fetchData, {
        getNextPageParam: (lastPage, pages) => lastPage.next,
    })

    const [msg, setMsg] = useState<string>('')

    const msgCont = useRef<HTMLDivElement>(null)
    const previousScrollPos = useRef(0)
    const typingTimeout: { current: NodeJS.Timeout | null } = useRef(null)
    const stoppedTypeTimeout: { current: NodeJS.Timeout | null } = useRef(null)

    const scrollToBottom = useCallback(() => {
        if (msgCont.current) {
            msgCont.current.scrollTop = msgCont.current.scrollHeight
        }
    }, [])

    const refetch = useCallback(() => {
        query.refetch()
    }, [query])

    //fetch more when scrolled to top
    useEffect(() => {
        if (msgCont.current) {
            const messageCont = msgCont.current
            const onScroll = () => {
                if (messageCont.scrollTop === 0 && query.hasNextPage) {
                    query.fetchNextPage()
                }
            }
            messageCont.addEventListener('scroll', onScroll)

            return () => {
                messageCont.removeEventListener('scroll', onScroll)
            }
        }
    }, [query, query.hasNextPage])

    //socket events
    useEffect(() => {
        if (!socket.current) return
        socket.current.on(`message ${groupId.toString()}`, (data: Message) => {
            setUserTyping('')
            refetch()
            const userPosInChat =
                msgCont.current.scrollHeight -
                msgCont.current.scrollTop -
                msgCont.current.clientHeight
            // scroll to bottom if user sent message and has not scrolled more than 300px
            if (
                data.from.userId === session?.data?.user?.id &&
                userPosInChat < 300
            ) {
                msgCont.current.scrollTop = msgCont.current.scrollHeight
            }
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
    }, [
        activeTab,
        groupId,
        refetch,
        session.data.user.id,
        setUserTyping,
        socket,
    ])

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

            if (typingTimeout.current) {
                return
            } else {
                typingTimeout.current = setTimeout(() => {
                    socket.current.emit(
                        `typing`,
                        groupId,
                        session?.data.user?.name
                    )
                    typingTimeout.current = null
                }, 1000)
            }

            stoppedTypeTimeout.current &&
                clearTimeout(stoppedTypeTimeout.current as NodeJS.Timeout)
            stoppedTypeTimeout.current = setTimeout(() => {
                socket.current.emit(
                    `stopped-typing`,
                    groupId,
                    session?.data.user?.name
                )
            }, 4000)
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
                postJSON(`/api/groups/${groupId}/messages`, msgData)
                socket.current.emit(`message ${groupId}`, msgData)
                setMsg('')
                if (stoppedTypeTimeout.current) {
                    console.log('clearing timeout')
                    clearTimeout(stoppedTypeTimeout.current as NodeJS.Timeout)
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

    //filter messages by the day they were sent
    const messagesByDay = useMemo(() => {
        let messagesByDay: ByDayMessage[] = []
        if (!query.data) return messagesByDay
        query.data.pages.forEach((page) => {
            page.messages.forEach((message) => {
                const day = new Date(message.timestamp)
                const index = messagesByDay.findIndex(
                    (m) =>
                        m.day.getFullYear() === day.getFullYear() &&
                        m.day.getMonth() === day.getMonth() &&
                        m.day.getDate() === day.getDate()
                )
                if (index === -1) {
                    messagesByDay.unshift({
                        day,
                        messages: [message],
                    })
                } else {
                    messagesByDay[index].messages.unshift(message)
                }
            })
        })
        return messagesByDay
    }, [query.data])

    //dont show name/pic if previous message is from the same person and within the last 5 minutes
    const shouldShowName = useCallback((messages: Message[], index: number) => {
        if (index === 0) return true
        const lastMessage = messages[index - 1]
        const lastMessageDate = new Date(lastMessage.timestamp)
        const currentMessageDate = new Date(messages[index].timestamp)
        const diff = currentMessageDate.getTime() - lastMessageDate.getTime()
        const diffMinutes = Math.floor(diff / 1000 / 60)
        if (
            lastMessage.from.userId === messages[index].from.userId &&
            diffMinutes < 5
        ) {
            return false
        }
        return true
    }, [])

    const renderMessages = useCallback(() => {
        if (messagesByDay.length === 0) return <div>Ingen meldinger.</div>
        return messagesByDay.map((day) => {
            return (
                <div
                    key={day.day.getTime()}
                    className='flex flex-col gap-0.5 text-dark-1 last:pb-2'>
                    <div className='flex items-center gap-2 '>
                        <div className='bg-dark-5 w-full h-[1px] '></div>
                        {day.day.toLocaleDateString() ===
                        new Date().toLocaleDateString() ? (
                            <div className='font-semibold text-dark-4 text-sm text-center'>
                                Today
                            </div>
                        ) : (
                            <div className='font-semibold text-dark-4 text-xs'>
                                {day.day.toLocaleDateString()}
                            </div>
                        )}
                        <div className='bg-dark-5 w-full h-[1px]'></div>
                    </div>
                    {day.messages.map((message: Message, j) => (
                        <div key={j}>
                            {!shouldShowName(day.messages, j) ? (
                                <div className='group flex gap-2 items-center hover:bg-gray-100'>
                                    <div className='w-14 text-white text-center text-xs group-hover:text-dark-3'>
                                        {new Date(message.timestamp)
                                            .toLocaleTimeString()
                                            .slice(0, -3)}
                                    </div>
                                    <div className='flex flex-col'>
                                        {message.message}
                                    </div>
                                </div>
                            ) : (
                                <MessageItem
                                    message={message}
                                    groupMembers={groupMembers}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )
        })
    }, [groupMembers, messagesByDay, shouldShowName])

    //retain scroll pos when loading more messages
    useMemo(() => {
        if (msgCont.current) {
            const cont = msgCont.current
            previousScrollPos.current = cont.scrollHeight - cont.scrollTop
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query?.data?.pages?.length])

    useLayoutEffect(() => {
        if (msgCont?.current) {
            const cont = msgCont.current
            cont.scrollTop = cont.scrollHeight - previousScrollPos.current
        }
    }, [query?.data?.pages?.length])

    //scroll to bottom the first time the component is rendered
    useEffect(() => {
        if (messagesByDay.length <= 1) {
            scrollToBottom()
        }
    }, [messagesByDay.length, scrollToBottom])

    if (query.isError) {
        return <div>Error: {query.error.message}</div>
    }
    return (
        <div className='relative flex flex-col gap-2'>
            <div
                ref={msgCont}
                className='flex flex-col h-[500px] overflow-y-auto gap-1'>
                <>
                    {query.isFetchingNextPage && (
                        <div className='flex justify-center items-center'>
                            <div>Laster inn...</div>
                        </div>
                    )}
                    {renderMessages()}
                </>
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
