import { ObjectId } from 'mongodb'
import nextConnect from 'next-connect'
import { Member } from 'types/groups'
import { connectToDB } from 'lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

interface Group {
    _id: ObjectId
    groupName: string
    members: Member[]
    maxMembers: number
    tags: string[]
    description: string
    private: boolean
    admin: Member | null
    pendingMembers: Member[]
}

const handler = nextConnect()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const {
        groupName,
        maxMembers,
        tags,
        description,
        private: isPrivate,
    } = req.body
    const group: Group = {
        _id: new ObjectId(),
        groupName,
        members: [],
        maxMembers,
        tags,
        description,
        private: isPrivate,
        admin: null,
        pendingMembers: [],
    }
    await db
        .collection('atcampus-groups')
        .insertOne(group)
        .then(() => {
            res.status(200).json(group)
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
})
