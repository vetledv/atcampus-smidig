import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'

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

export default handler
