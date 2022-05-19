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
    res.end()
}
export default SocketHandler
