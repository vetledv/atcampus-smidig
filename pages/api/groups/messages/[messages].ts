import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextApiResponseServerIO } from 'types/socket'
import { SendMessage } from './../../../../types/groups'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    const { db } = await connectToDB()
    console.log('REQUEST METHOD: ', req.method)
    if (req.method === 'GET') {
        const { messages: groupId } = req.query
        console.log('[messages] groupId: ', groupId)
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
                console.log('messages: ', messages)
                res.status(200).json(messages)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }

    if (req.method === 'POST') {
        const { messages: groupId } = req.query
        const message: SendMessage = JSON.parse(req.body)
        console.log('[messages] message: ', message.message)
        console.log('[messages] groupId: ', groupId)
        await db
            .collection('group-messages')
            .updateOne(
                { groupId: new ObjectId(groupId as string) },
                {
                    $push: {
                        messages: {
                            timestamp: new Date(),
                            from: {
                                userId: new ObjectId(message.userId),
                                userName: message.userName,
                            },
                            message: message.message,
                        },
                    },
                }
            )
            .then((messages) => {
                res.status(200).json(messages)
                res?.socket?.server?.io?.emit(`message ${groupId}`, message)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }
}
