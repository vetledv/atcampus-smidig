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
    }
    res?.socket?.server?.io?.on('connection', (socket) => {
        var query = socket.handshake.query
        var room = query.room
        var userId = query.userId
        console.log('ROOM: ', room)

        socket.on('create', async (room) => {
            socket.join(room)
            console.log('SOCKET: joined', room)
            socket.emit('activedeez', 1)
        })
        socket.on('active', async (room) => {
            console.log('SOCKET: active')
            res?.socket?.server?.io
                ?.in(req.query.room)
                .allSockets()
                .then((sockets) => {
                    console.log(sockets.size)
                    socket.emit('active-members', sockets.size)
                })
            //all active sockets in room
        })
        socket.on('leave', async (room) => {
            socket.leave(room)
            console.log('SOCKET: left', room)
        })
    })
}
export default SocketHandler
