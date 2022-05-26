import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'
import { Group } from 'types/groups'

const handler = nextConnect()
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const { group } = req.query
    await db
        .collection('atcampus-groups')
        .findOne({ _id: new ObjectId(group as string) })
        .then((group) => {
            res.status(200).json(group)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const { groupId } = req.query
    const session = await getToken({
        req,
        secret: secret_key,
    })
    if (!session) {
        res.status(401).json({
            error: 'Unauthorized',
        })
    }
    const messageCollection = db.collection('group-messages')
    const groupCollection = db.collection('atcampus-groups')
    await messageCollection
        .deleteOne({ groupId: new ObjectId(groupId as string) })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })
    await groupCollection
        .deleteOne({ _id: new ObjectId(groupId as string) })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })
    res.status(200).json({
        message: 'Group deleted',
    })
})

export default handler
