import { connectToDB } from 'lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Group } from 'types/groups'
import { Tags } from '../../../types/groups'

const handler = nextConnect()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDB()
    const tags = JSON.parse(req.body) as Tags
    const { school, course, goals } = tags

    const noGoalFind = db
        .collection('atcampus-groups')
        .find({
            'tags.school': school,
            'tags.course': course,
        })
        .toArray()

    await db
        .collection('atcampus-groups')
        .find({
            'tags.school': school,
            'tags.course': course,
            'tags.goals': {
                $in: goals,
            },
        })
        .toArray()
        .then((groups: Group[]) => {
            //if length is 0, search without goals
            if (groups.length === 0) {
                noGoalFind.then((noGoalGroups: Group[]) => {
                    console.log('creategroupapi:', noGoalGroups)
                    res.status(200).json(noGoalGroups)
                })
            } else {
                console.log('creategroupapi:', groups)
                res.status(200).json(groups)
            }
        })
        .catch((error: Error) => {
            console.log('error', error)
            res.status(500).json({
                error,
            })
        })
})
export default handler
