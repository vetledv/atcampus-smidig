import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = nextConnect()
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const { page } = req.query

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
            //use limit and offset if exists to paginate
            if (page) {
                const pPage = parseInt(page as string)
                const limit = 6
                const offset = (pPage - 1) * limit
                const total = groups.length
                const totalPages = Math.ceil(total / limit)
                const pagedGroups = groups.slice(offset, offset + limit)

                res.status(200).json({
                    totalPages,
                    totalGroups: total,
                    limit,
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
