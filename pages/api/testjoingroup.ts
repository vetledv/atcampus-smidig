import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handlera(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDB()

    //TODO: if group is private, add user to pendingMembers instead of members
    //TODO: if group is full, send error message
    if (req.method === 'GET') {
        await db
            .collection('atcampus-groups')
            .find({})
            .toArray()
            .then((groups) => {
                if (groups.length > 0) {
                    res.status(200).json(groups)
                } else {
                    res.status(200).json([])
                }
            })
    }

    if (req.method === 'POST') {
        const { groupId, userId, userName } = req.body
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
}
