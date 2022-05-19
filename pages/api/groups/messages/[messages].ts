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
    const { messages: groupId } = req.query
    if (req.method === 'GET') {
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
                res.status(200).json(messages)
                console.log('added message')
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }

    if (req.method === 'POST') {
        const { userId, userName, message, groupName } = JSON.parse(
            req.body
        ) as SendMessage
        console.log('[messages] message: ', message)
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
                                userId: new ObjectId(userId),
                                userName: userName,
                            },
                            message: message,
                        },
                    },
                }
            )
            .then((messages) => {
                res?.socket?.server?.io?.emit(`message ${groupName}`, message)
                res.status(201).json(messages)
                console.log(`message ${groupName.toString()}`)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error',
                    error: err,
                })
            })
    }
}
