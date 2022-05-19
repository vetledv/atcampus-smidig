import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDB()
    const { groupId, userId, userName } = JSON.parse(req.body)

    //TODO: if group is private, add user to pendingMembers instead of members
    //TODO: if group is full, send error message

    const filter = {
        _id: new ObjectId(groupId),
    }
    const update = {
        $addToSet: {
            members: {
                userId: userId,
                userName: userName,
            },
        },
    }

    await db
        .collection('atcampus-groups')
        .updateOne(filter, update)
        .then(() => {
            res.status(200).send('success')
        })
        .catch((err) => {
            res.status(500).json({
                message: 'error',
                error: err,
            })
        })
}
