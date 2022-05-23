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
        console.log('POST')
        const { groupId, userId, userName, picture, isPrivate } = JSON.parse(
            req.body
        )
        const filter = {
            _id: new ObjectId(groupId),
        }
        const members = {
            userId,
            userName,
            picture,
        }
        if (isPrivate) {
            //check if user is already in pendingMembers
            await db
                .collection('atcampus-groups')
                .findOne({
                    ...filter,
                    pendingMembers: {
                        $elemMatch: {
                            userId,
                        },
                    },
                })
                .then((group) => {
                    if (group) {
                        res.status(200).json({
                            message: 'Already pending invite',
                            private: true,
                        })
                    } else {
                        //add user to pendingMembers
                        db.collection('atcampus-groups')
                            .updateOne(filter, {
                                $push: {
                                    pendingMembers: members,
                                },
                            })
                            .then(() => {
                                res.status(200).json({
                                    message: 'Await approval from group owner',
                                    private: true,
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    message: err.message,
                                })
                            })
                    }
                })
        } else {
            await db
                .collection('atcampus-groups')
                .updateOne(filter, {
                    $addToSet: {
                        members,
                    },
                })
                .then((updateResult) => {
                    console.log(groupId)
                    res.status(200).json({
                        message: 'success',
                        private: false,
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err.message,
                    })
                })
        }
    }
}
