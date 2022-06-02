import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import nextConnect from 'next-connect'
import { NextApiResponseServerIO } from 'types/socket'
import type { SendMessage } from '../../../../types/groups'
import type { NextApiRequest } from 'next'

const messagesHandler = nextConnect()

messagesHandler.get(
    async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        const { db } = await connectToDB()
        const { group: groupId } = req.query
        const page = Number(req.query.page as string)
        await db
            .collection('group-messages')
            .findOne({ groupId: new ObjectId(groupId as string) })
            .then((messages) => {
                if (!messages) {
                    res.status(200).json({ messages: [] })
                } else {
                    const invertedMessages = messages.messages.reverse()
                    //messages to send 50 messages per page
                    const start = (page - 1) * 50
                    const end = start + 50
                    const messagesToSend = invertedMessages.slice(start, end)
                    //check if more pages, send next page
                    if (messages.messages.length > end) {
                        res.send({
                            messages: messagesToSend,
                            next: page + 1,
                        })
                    } else {
                        res.send({
                            messages: messagesToSend,
                            next: null,
                        })
                    }
                }
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
        const { group } = req.query
        const { userId, userName, message } = JSON.parse(
            req.body
        ) as SendMessage
        const date = new Date()
        await db
            .collection('group-messages')
            .updateOne(
                { groupId: new ObjectId(group as string) },
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
                    ?.in(group)
                    .emit(`message ${group as string}`, emitObj)
                console.log(`message ${group as string}`, emitObj)
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
