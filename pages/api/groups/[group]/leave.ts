import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    //leave group
    const session = await getToken({
        req,
        secret: secret_key,
    })
    const { db } = await connectToDB()
    const { group } = req.query

    const filter = {
        _id: new ObjectId(group as string),
    }
    const pull = {
        $pull: {
            members: {
                userId: session?.sub,
            },
        },
    }
    await db
        .collection('atcampus-groups')
        .updateOne(filter, pull)
        .then(() => {
            res.status(200).send('success')
        })
        .catch((err: Error) => {
            res.status(400).json({
                error: err,
            })
        })
})
export default handler
