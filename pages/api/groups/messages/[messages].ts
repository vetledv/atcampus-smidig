import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest } from 'next'
import nextConnect from 'next-connect'
import { NextApiResponseServerIO } from 'types/socket'
import { SendMessage } from './../../../../types/groups'

const messagesHandler = nextConnect()

const middleware = async (
    req: NextApiRequest,
    res: NextApiResponseServerIO,
    next
) => {
    const { messages: groupId } = req.query
    console.log(`groupId: ${groupId}`)
    res?.socket?.server?.io
        .in(`${groupId}`)
        .allSockets()
        .then((sockets) => {
            console.log(`room:${groupId} sockets size:`, sockets.size)
            return sockets.size
        })
        .then((number) => {
            res?.socket?.server?.io.in(`${groupId}`).emit('active', number)
        })
    next()
}

messagesHandler.get(
    async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        const { db } = await connectToDB()
        const { messages: groupId } = req.query
        await db
            .collection('group-messages')
            .findOne({ groupId: new ObjectId(groupId as string) })
            .then((messages) => {
                // if (!messages) {
                //     const newMessages = {
                //         groupId: groupId,
                //         messages: [],
                //     }
                //     db.collection('group-messages').insertOne(newMessages)
                //     res.status(200).json(newMessages)
                // }
                res.status(200).json(messages)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }
)

messagesHandler.post(
    async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        const { db } = await connectToDB()
        const { messages: groupId } = req.query
        const { userId, userName, message, groupName } = JSON.parse(
            req.body
        ) as SendMessage
        // console.log('[messages] message: ', message)
        // console.log('[messages] groupId: ', groupId)
        await db
            .collection('group-messages')
            .updateOne(
                { groupId: new ObjectId(groupId as string) },
                {
                    $push: {
                        messages: {
                            timestamp: new Date(),
                            from: {
                                userId: userId,
                                userName: userName,
                            },
                            message: message,
                        },
                    },
                }
            )
            .then((messages) => {
                //res?.socket?.server?.io?.emit(`message ${groupName}`, message)
                res?.socket?.server?.io
                    ?.in(groupId)
                    .emit(`message ${groupId}`, message)
                res.status(201).json(messages)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }
)
messagesHandler.use(middleware)

export default messagesHandler
