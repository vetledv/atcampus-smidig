import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const session = await getToken({
        req,
        secret: secret_key,
    })
    await db
        .collection('atcampus-groups')
        .find({
            members: {
                $elemMatch: {
                    userId: session?.sub,
                },
            },
        })
        .toArray()
        .then((groups) => {
            if (groups.length > 0) {
                res.status(200).json(groups)
            } else {
                res.status(200).json([])
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'error',
                error: err,
            })
        })
})

export default handler
