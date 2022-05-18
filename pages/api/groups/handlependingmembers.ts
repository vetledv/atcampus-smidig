import { secret_key } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
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
    const { admin, userToAdd, groupId, action } = JSON.parse(req.body)

    const filter = {
        _id: new ObjectId(groupId),
    }
    const add = {
        $addToSet: {
            members: {
                userId: new ObjectId(userToAdd.userId),
                userName: userToAdd.userName,
            },
        },
    }
    //if method delete, then remove from members

    const pull = {
        $pull: {
            pendingMembers: {
                userId: new ObjectId(userToAdd.userId),
                userName: userToAdd.userName,
            },
        },
    }

    if (admin.userId.toString() !== session.sub) {
        res.status(401).json({
            message: 'unauthorized',
        })
    } else {
        if (action === 'REMOVE') {
            await db
                .collection('atcampus-groups')
                .updateOne(filter, pull)
                .then(() => {
                    res.status(200).send('success')
                })
                .catch((err: Error) => {
                    res.status(400).json({
                        message: 'error',
                        error: err,
                    })
                })
        } else if (action === 'ADD') {
            await db
                .collection('atcampus-groups')
                .updateOne(filter, { ...add, ...pull })
                .then(() => {
                    res.status(200).send('success')
                })
                .catch((err: Error) => {
                    res.status(400).json({
                        message: 'error',
                        error: err,
                    })
                })
        }
    }
}

// switch (action) {
//     case 'ADD':
//         await db
//             .collection('atcampus-groups')
//             .updateOne(filter, { ...add, ...pull })
//             .then(() => {
//                 res.status(200).send('success')
//             }
//             )
//             .catch((err: Error) => {
//                 res.status(400).json({
//                     message: 'error',
//                     error: err,
//                 })
//             }
//             )
//         break
//     case 'REMOVE':
//         await db
//             .collection('atcampus-groups')
//             .updateOne(filter, pull)
//             .then(() => {
//                 res.status(200).send('success')
//             }
//             )
//             .catch((err: Error) => {
//                 res.status(400).json({
//                     message: 'error',
//                     error: err,
//                 })
//             }
//             )
//         break
//     default:
//         res.status(400).json({
//             message: 'error',
//             error: 'invalid action',
//         })
//         break
//     }
