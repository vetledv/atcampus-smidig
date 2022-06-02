import { useEffect, useRef, useState } from 'react'
import SocketIOClient, { Socket } from 'socket.io-client'

const useGroupSocket = (deps: any = [], groupId: string) => {
    const socket = useRef<Socket | null>(null)
    const [connected, setConnected] = useState<boolean>(false)

    useEffect(() => {
        if (!groupId || socket.current) return
        socket.current = SocketIOClient(process.env.NEXTAUTH_URL as string, {
            path: '/api/groups/socket',
            query: {
                room: groupId,
            },
            closeOnBeforeunload: true,
        })
        socket.current.on('connect', () => {
            console.log('socket connected, id:', socket.current?.id)
            //join a room
            socket.current?.emit('create', groupId)
            setConnected(true)
            console.log('joined room')
            console.log(socket.current)
        })
        const currSocket = socket.current
        currSocket.connect()
        return () => {
            currSocket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps])
    return { socket, connected, setConnected }
}
export default useGroupSocket
