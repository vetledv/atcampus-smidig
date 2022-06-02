import useRetainScrollPos from '@/hooks/useRetainScrollPos'
import FlatButton from 'components/general/FlatButton'
import { postJSON } from 'hooks/useGroups'
import MessageItem from './MessageItem'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import type { Group, Message, SendMessage } from 'types/groups'
import type {
    Dispatch,
    SetStateAction,
    KeyboardEvent,
    MutableRefObject,
} from 'react'

interface ByDayMessage {
    day: Date
    messages: Message[]
}

interface InfMessages {
    messages: Message[]
    next: number | null
}

type timeoutRef = { current: NodeJS.Timeout | null }

const Chat = ({
    group,
    connected,
    socket,
    userTyping,
    setUserTyping,
}: {
    group: Group
    connected: boolean
    socket: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>
    userTyping: string
    setUserTyping: Dispatch<SetStateAction<string>>
}) => {
    const session = useSession()

    const fetchData = async ({ pageParam = 1 }) => {
        const response = await fetch(
            `/api/groups/${group._id}/messages?page=` + pageParam
        )
        const data = await response.json()
        return data
    }
    const query = useInfiniteQuery<InfMessages, Error>('messages', fetchData, {
        getNextPageParam: (lastPage, pages) => lastPage.next,
    })

    const { contRef } = useRetainScrollPos([query?.data?.pages?.length])
    const [msg, setMsg] = useState<string>('')

    const typingTimeout: timeoutRef = useRef(null)
    const stoppedTypeTimeout: timeoutRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        if (contRef.current) {
            contRef.current.scrollTop = contRef.current.scrollHeight
        }
    }, [contRef])

    const refetch = useCallback(() => {
        query.refetch()
    }, [query])

    //fetch more when scrolled to top
    useEffect(() => {
        if (contRef.current) {
            const messageCont = contRef.current
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
    }, [contRef, query, query.hasNextPage])

    //socket events
    useEffect(() => {
        if (!socket.current) return
        socket.current.on(
            `message ${group._id.toString()}`,
            (data: Message) => {
                setUserTyping('')
                refetch()
                const userPosInChat = contRef.current
                    ? contRef.current.scrollHeight -
                      contRef.current.scrollTop -
                      contRef.current.clientHeight
                    : 0
                // scroll to bottom if user sent message and has not scrolled more than 300px
                if (userPosInChat < 300 && contRef.current) {
                    contRef.current.scrollTop = contRef.current.scrollHeight
                }
            }
        )
        socket.current.on(`typing`, (data, user: string) => {
            console.log('typing:', data, 'user: ', user)
            setUserTyping(user)
        })
        socket.current.on(`stopped-typing`, (data, user) => {
            console.log(
                'stopped typing messagecomponent:',
                data,
                'user: ',
                user
            )
            setUserTyping('')
        })
    }, [contRef, group, refetch, session.data.user.id, setUserTyping, socket])

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
                    socket.current?.emit(
                        `typing`,
                        group._id.toString(),
                        session.data?.user?.name
                    )
                    typingTimeout.current = null
                }, 1000)
            }

            stoppedTypeTimeout.current &&
                clearTimeout(stoppedTypeTimeout.current as NodeJS.Timeout)
            stoppedTypeTimeout.current = setTimeout(() => {
                socket.current?.emit(
                    `stopped-typing`,
                    group._id.toString(),
                    session.data?.user?.name
                )
            }, 4000)
        },
        [group, session.data?.user.name, socket]
    )

    const sendMessage = useCallback(
        (message: string) => {
            if (session.status === 'authenticated' && msg.length > 0) {
                if (session.data.user === null || undefined) return
                const msgData: SendMessage = {
                    userId: session.data.user.id as string,
                    userName: session.data.user.name as string,
                    message: message,
                    groupName: group.groupName,
                    groupId: group._id,
                }
                postJSON(
                    `/api/groups/${group._id.toString()}/messages`,
                    msgData
                )
                socket.current?.emit(`message ${group._id.toString()}`, msgData)
                setMsg('')
                if (stoppedTypeTimeout.current) {
                    console.log('clearing timeout')
                    clearTimeout(stoppedTypeTimeout.current as NodeJS.Timeout)
                    socket.current?.emit(
                        `stopped-typing ${group._id.toString()}`,
                        group._id.toString(),
                        session?.data.user?.name
                    )
                }
            }
        },
        [group, msg.length, session.data.user, session.status, socket]
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
                                    groupMembers={group.members}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )
        })
    }, [group.members, messagesByDay, shouldShowName])

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
                ref={contRef}
                className='flex flex-col h-[500px] overflow-y-auto gap-1'>
                {renderMessages()}
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

export default Chat
