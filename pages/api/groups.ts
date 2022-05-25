import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const { page } = req.query
    console.log(req.query)
    //TODO:pagination
    const session = await getToken({
        req,
        secret: secret_key,
    })
    //send all groups that user is in with pagination
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
            //use limit and offset if exists
            if (page) {
                const pPage = parseInt(page as string)
                const limit = 1
                const offset = (pPage - 1) * limit
                const total = groups.length
                const totalPages = Math.ceil(total / limit)
                const pagedGroups = groups.slice(offset, offset + limit)
                res.status(200).json({
                    totalPages,
                    groups: pagedGroups,
                })
            } else {
                res.status(200).json(groups)
            }
        })
        .catch((error: Error) => {
            res.status(500).json({
                error,
            })
        })
})

export default handler
