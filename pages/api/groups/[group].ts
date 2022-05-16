import { connectToDB } from 'lib/mongodb'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDB()
    const { group } = req.query
    const collection = await db
        .collection('atcampus-groups')
        .findOne({ groupName: group })
    res.json(collection)
}
