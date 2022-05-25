import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { Server as NetServer } from 'http'
import { NextApiResponseServerIO } from 'types/socket'

export const config = {
    api: {
        bodyParser: false,
    },
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log('New Socket.io server...')
        const httpServer: NetServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path: '/api/groups/socket',
        })
        res.socket.server.io = io

        io.on('connection', (socket) => {
            var query = socket.handshake.query
            var room = query.room
            console.log('ROOM: ', room)
            let typing = false

            socket.on('create', async (room) => {
                socket.join(room)
                console.log('SOCKET: joined', room)
                broadcastActiveMembers(room)
            })
            socket.on('active', async (room) => {
                broadcastActiveMembers(room)
            })
            socket.on(`typing`, (data, user) => {
                console.log('SOCKET_TYPING: ', data, 'user: ', user)
                console.log(typing)
                typing = true
                socket.broadcast.to(room).emit(`typing`, data, user)
            })
            socket.on(`stopped-typing`, (data, user) => {
                console.log('SOCKET_STOPPED_TYPING: ', data, 'user: ', user)
                typing = false
                console.log(typing)
                socket.broadcast.to(room).emit(`stopped-typing`, data, user)
            })
            socket.on('leave', async (room) => {
                console.log('SOCKET_LEAVE: ', room)
                socket.leave(room)
                console.log(typing)
                if (typing) {
                    console.log('emitting stopped to room on leave')
                    socket.to(room).emit(`stopped-typing`, {}, {})
                }
                broadcastActiveMembers(room)
            })
            socket.on('disconnect', async () => {
                console.log('SOCKET_DISCONNECT: ', room)
                socket.leave(room as string)
                console.log(typing)
                if (typing) {
                    console.log('emitting stopped to room on disconnect')
                    socket.to(room).emit(`stopped-typing`, {}, {})
                }
                //wait in case the user reconnects
                setTimeout(() => {
                    broadcastActiveMembers(room as string, true)
                }, 15 * 1000)
            })

            function broadcastActiveMembers(room: string, timeout?: boolean) {
                io.in(room)
                    .allSockets()
                    .then((sockets) => {
                        io.in(room).emit('active-members', sockets.size - 1)
                        if (timeout) {
                            console.log(
                                'SOCKET_ACTIVE_SIZE_LEAVE: ',
                                sockets.size
                            )
                        } else {
                            console.log('SOCKET_ACTIVE_SIZE: ', sockets.size)
                        }
                    })
                    .catch(() => {
                        console.log('error')
                    })
            }
        })
    } else {
        console.log('Socket already running')
    }
    res.end()
}
export default SocketHandler
