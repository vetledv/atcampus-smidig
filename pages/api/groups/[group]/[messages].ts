import { connectToDB } from 'lib/mongodb'
import { ObjectId, WithId } from 'mongodb'
import { NextApiRequest } from 'next'
import nextConnect from 'next-connect'
import { NextApiResponseServerIO } from 'types/socket'
import { GroupMessages, SendMessage } from '../../../../types/groups'

const messagesHandler = nextConnect()

messagesHandler.get(
    async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        const { db } = await connectToDB()
        const { group: groupId } = req.query
        //TODO: limit and offset
        const limit = parseInt(req.query.limit as string) || 10
        const offset = parseInt(req.query.offset as string) || 0
        await db
            .collection('group-messages')
            .findOne({ groupId: new ObjectId(groupId as string) })
            .then((messages: WithId<GroupMessages>) => {
                const slicedMessages = messages.messages.slice(
                    offset,
                    offset + limit
                )
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
        const { userId, userName, message } = JSON.parse(
            req.body
        ) as SendMessage
        const date = new Date()
        await db
            .collection('group-messages')
            .updateOne(
                { groupId: new ObjectId(groupId as string) },
                {
                    $push: {
                        messages: {
                            timestamp: date,
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
                const emitObj = {
                    timestamp: date,
                    from: {
                        userId: userId,
                        userName: userName,
                    },
                    message: message,
                }
                res?.socket?.server?.io
                    ?.in(groupId)
                    .emit(`message ${groupId as string}`, emitObj)
                console.log(`message ${groupId as string}`, emitObj)
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

export default messagesHandler
