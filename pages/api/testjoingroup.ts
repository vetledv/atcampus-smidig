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
    const { groupId, userId, userName, picture } = JSON.parse(req.body)
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
            if (!group) {
                res.status(404).json({ error: 'Group not found' })
            }
            //check if user is in members or pendingMembers
            if (group.members.find((member) => member.userId === userId)) {
                res.status(200).json({
                    message: 'Allerede medlem',
                })
            } else if (
                group.pendingMembers.find((member) => member.userId === userId)
            ) {
                res.status(200).json({
                    message: 'Venter på godkjenning',
                })
            }

            if (group.members.length < group.maxMembers) {
                if (group.private) {
                    //add user to pendingMembers
                    db.collection('atcampus-groups').updateOne(filter, {
                        $push: {
                            pendingMembers: members,
                        },
                    })
                    res.status(200).json({
                        message: 'Venter på godkjenning',
                        private: true,
                    })
                } else {
                    db.collection('atcampus-groups').updateOne(filter, {
                        $push: {
                            members: members,
                        },
                    })
                    res.status(200).json({
                        message: 'Lagt til i gruppen',
                        private: false,
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Gruppen er full',
                })
            }
        })
        .catch((error: Error) => {
            res.status(500).json({
                error,
            })
        })
})
export default handler
