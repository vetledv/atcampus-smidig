import { mongodb_url } from 'lib/constants'
import { connectToDB } from 'lib/mongodb'
import { MongoClient } from 'mongodb'

async function database(req, res, next) {
    const { client, db } = await connectToDB()
    req.db = db
    req.dbClient = client
}
