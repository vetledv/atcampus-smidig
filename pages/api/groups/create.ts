import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Group, GroupMessages } from 'types/groups'

const handler = nextConnect()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const {
        groupName,
        maxMembers,
        members,
        tags,
        description,
        admin,
        private: isPrivate,
    } = JSON.parse(req.body) as Group

    const group: Group = {
        _id: new ObjectId(),
        groupName,
        description,
        private: isPrivate,
        admin,
        members,
        maxMembers,
        pendingMembers: [],
        tags,
    }
    const group_messages: GroupMessages = {
        _id: new ObjectId(),
        groupId: group._id,
        messages: [],
    }
    const messageCollection = db.collection('group-messages')
    const groupCollection = db.collection('atcampus-groups')
    await messageCollection.insertOne(group_messages)
    await groupCollection.insertOne(group)
    console.log('creategroupapi:', req.body)
    res.status(200).json({ groupId: group._id })
})
export default handler
