import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'
import { Group } from 'types/groups'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()

    const { page: stringPage } = req.query
    const page = parseInt(stringPage as string)
    const limit = 3
    const offset = (page - 1) * limit
    const {
        school,
        subject,
        goals: qGoals,
    } = req.query as { school: string; subject: string; goals: string }
    const goals = qGoals.split(',')

    const session = await getToken({
        req,
        secret: secret_key,
    })

    const noGoalFind = db
        .collection('atcampus-groups')
        .find({
            'tags.school': school,
            'tags.course': subject,
            'tags.goals': {
                $in: goals,
            },
        })
        .toArray()

    await db
        .collection('atcampus-groups')
        .find({
            'tags.school': school,
            'tags.course': subject,
        })
        .toArray()
        .then((groups: Group[]) => {
            if (groups.length === 0) {
                noGoalFind.then((noGoalGroups: Group[]) => {
                    //filter out groups from noGoalGroups that user is already in
                    const filteredGroups = noGoalGroups.filter(
                        (group) =>
                            !group.members.some(
                                (member) => member.userId === session.sub
                            )
                    )
                    const total = filteredGroups.length
                    const totalPages = Math.ceil(total / limit)
                    const pagedGroups = filteredGroups.slice(
                        offset,
                        offset + limit
                    )

                    res.status(200).json({
                        totalPages,
                        totalGroups: total,
                        limit,
                        groups: pagedGroups,
                    })
                })
            } else {
                const filteredGroups = groups.filter(
                    (group) =>
                        !group.members.some(
                            (member) => member.userId === session.sub
                        )
                )
                const total = filteredGroups.length
                const totalPages = Math.ceil(total / limit)
                const pagedGroups = filteredGroups.slice(offset, offset + limit)
                res.status(200).json({
                    totalPages,
                    totalGroups: total,
                    limit,
                    groups: pagedGroups,
                })
            }
        })
        .catch((error: Error) => {
            res.status(500).json({
                error,
            })
        })
})

export default handler
