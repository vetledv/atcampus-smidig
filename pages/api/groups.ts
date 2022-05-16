import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getToken({
        req,
        secret: secret_key,
    })
    const { db } = await connectToDB()
    const collection = await db
        .collection('atcampus-groups')
        .find({
            members: {
                $elemMatch: {
                    userId: new ObjectId(session?.sub),
                },
            },
        })
        .toArray()
    res.json(collection)
}
