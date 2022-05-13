import { connectToDB } from '../../lib/mongodb'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db, client } = await connectToDB()
    const collection = await db.collection('atcampus-groups').find({}).toArray()
    res.json(collection)
}
