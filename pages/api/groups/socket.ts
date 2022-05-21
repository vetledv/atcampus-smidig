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

            socket.on('create', async (room) => {
                socket.join(room)
                console.log('SOCKET: joined', room)
                io.in(req.query.room)
                    .allSockets()
                    .then((sockets) => {
                        console.log('SOCKET_CREATE_SIZE_: ', sockets.size)
                        socket.emit('active-members', sockets.size)
                    })
            })
            socket.on('active', async (room) => {
                io.in(req.query.room)
                    .allSockets()
                    .then((sockets) => {
                        console.log('SOCKET_ACTIVE_SIZE: ', sockets.size)
                        socket.emit('active-members', sockets.size)
                    })
                //all active sockets in room
            })
            socket.on(`typing ${room}`, (data, user) => {
                console.log('SOCKET_TYPING: ', data, 'user: ', user)
                socket.broadcast.to(room).emit(`typing ${room}`, data, user)
                //emit stopped typing after 5 seconds of inactivity
            })
            socket.on(`stopped-typing ${room}`, (data, user) => {
                console.log('SOCKET_STOPPED_TYPING: ', data, 'user: ', user)
                socket.broadcast
                    .to(room)
                    .emit(`stopped-typing ${room}`, data, user)
            })
            socket.on('leave', async (room) => {
                console.log('SOCKET_LEAVE: ', room)
                socket.leave(room)
            })
        })
    } else {
        console.log('Socket already running')
    }
    res.end()
}
export default SocketHandler
