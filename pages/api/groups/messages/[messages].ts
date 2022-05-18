import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDB()
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
