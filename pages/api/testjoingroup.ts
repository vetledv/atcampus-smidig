import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Group } from 'types/groups'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
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
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { groupId, userId, userName, picture, isPrivate } = JSON.parse(
        req.body
    )
    const { db } = await connectToDB()
    const filter = {
        _id: new ObjectId(groupId),
    }
    const members = {
        userId,
        userName,
        picture,
    }
    await db
        .collection('atcampus-groups')
        .find(filter)
        .toArray()
        .then((groups: Group[]) => {
            const group = groups[0]
            if (group.members.length < group.maxMembers) {
                if (group.private) {
                    //add user to pendingMembers
                    db.collection('atcampus-groups').updateOne(filter, {
                        $push: {
                            pendingMembers: members,
                        },
                    })
                } else {
                    //add user to members
                    db.collection('atcampus-groups').updateOne(filter, {
                        $push: {
                            members: members,
                        },
                    })
                }
                res.status(200).json({
                    message: 'user added to group',
                })
            } else {
                res.status(400).json({
                    message: 'group is full',
                })
            }
        })
        .catch((error: Error) => {
            res.status(500).json({
                error,
            })
        })

    //     if (isPrivate) {
    //         //check if user is already in pendingMembers
    //         await db
    //             .collection('atcampus-groups')
    //             .findOne({
    //                 ...filter,
    //                 pendingMembers: {
    //                     $elemMatch: {
    //                         userId,
    //                     },
    //                 },
    //             })
    //             .then((group) => {
    //                 if (group) {
    //                     res.status(200).json({
    //                         message: 'Already pending invite',
    //                         private: true,
    //                     })
    //                 } else {
    //                     //add user to pendingMembers
    //                     db.collection('atcampus-groups')
    //                         .updateOne(filter, {
    //                             $push: {
    //                                 pendingMembers: members,
    //                             },
    //                         })
    //                         .then(() => {
    //                             res.status(200).json({
    //                                 message: 'Await approval from group owner',
    //                                 private: true,
    //                             })
    //                         })
    //                         .catch((err) => {
    //                             res.status(500).json({
    //                                 message: err.message,
    //                             })
    //                         })
    //                 }
    //             })
    //     } else {
    //         await db
    //             .collection('atcampus-groups')
    //             .updateOne(filter, {
    //                 $addToSet: {
    //                     members,
    //                 },
    //             })
    //             .then((updateResult) => {
    //                 console.log(groupId)
    //                 res.status(200).json({
    //                     message: 'success',
    //                     private: false,
    //                 })
    //             })
    //             .catch((err) => {
    //                 res.status(500).json({
    //                     message: err.message,
    //                 })
    //             })
    //     }
})
