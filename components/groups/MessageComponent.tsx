import FlatButton from 'components/buttons/FlatButton'
import { group } from 'console'
import { fetchReactQuery, postJSON } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query'
import SocketIOClient from 'socket.io-client'
import type { GroupMessages, SendMessage } from 'types/groups'

const MessageComponent = ({
    groupName,
    messages,
    refetchMsg,
}: {
    groupName: string
    messages: GroupMessages
    refetchMsg: () => void
}) => {
    const session = useSession()
    const [msg, setMsg] = useState<string>('')
    const [connected, setConnected] = useState<boolean>(false)

    useEffect((): any => {
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
        socket.on(`message ${groupName.toString()}`, (message) => {
            console.log(`message ${groupName}`)
            console.log('message received:', message)
            refetchMsg()
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
                groupName: groupName,
                groupId: messages.groupId,
            }
            postJSON(`/api/groups/messages/${message.groupId}`, message)
            setMsg('')
        }
    }

    return (
        <div className='flex flex-col gap-2 w-fit'>
            <h1 className='font-semibold'>Messages</h1>
            {messages.messages?.map((message, i) => (
                <div key={i} className='flex bg-pink-400 gap-2'>
                    <div>
                        {message.from.userName}
                        {':'}
                    </div>
                    <div>{new Date(message.timestamp).toLocaleString()}</div>
                    <div>{message.message}</div>
                </div>
            ))}
            <div className='flex gap-2'>
                <input
                    value={msg}
                    placeholder={
                        connected ? 'Type a message...' : 'Connecting...'
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
    )
}

export default MessageComponent
