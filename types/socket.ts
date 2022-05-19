import { Server as NetServer, Socket } from 'net'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'
import { Db, MongoClient } from 'mongodb'

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}
export type NextApiReqAndDB = NextApiRequest & {
    db: Db
    dbClient: MongoClient
}
