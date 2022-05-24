import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getToken({
        req,
        secret: secret_key,
    })
    const { db } = await connectToDB()
    const { admin, userToAdd, groupId, action } = JSON.parse(req.body)

    const filter = {
        _id: new ObjectId(groupId),
    }

    const add = {
        $addToSet: {
            members: {
                userId: userToAdd.userId,
                userName: userToAdd.userName,
                picture: userToAdd.picture,
            },
        },
    }

    const pull = {
        $pull: {
            pendingMembers: {
                userId: userToAdd.userId,
                userName: userToAdd.userName,
                picture: userToAdd.picture,
            },
        },
    }

    //check if user is admin
    if (admin.userId.toString() !== session.sub) {
        res.status(401).json({
            message: 'unauthorized',
        })
    } else {
        if (action === 'REMOVE') {
            //remove user from pending members if action is remove
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
        } else if (action === 'ADD') {
            //add user to members and remove from pending if action is add
            await db
                .collection('atcampus-groups')
                .updateOne(filter, { ...add, ...pull })
                .then(() => {
                    res.status(200).send('success')
                })
                .catch((err: Error) => {
                    res.status(400).json({
                        error: err,
                    })
                })
        } else {
            //if action is not add or remove
            res.status(400).json({
                message: 'invalid action',
            })
        }
    }
})

export default handler
