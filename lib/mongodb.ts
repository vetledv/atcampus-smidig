import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose'
import { Db, MongoClient } from 'mongoose/node_modules/mongodb'

dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined')
}

let cachedClient: Mongoose = null
let cachedDb: Db = null
let cachedMongoClient: MongoClient = null

export const connectToDB = async () => {
    if (cachedClient && cachedDb && cachedMongoClient) {
        return {
            client: cachedClient,
            db: cachedDb,
            mongoClient: cachedMongoClient,
        }
    }

    await mongoose.connect(MONGODB_URL)

    const client = mongoose
    const db = client.connection.db
    const mongoClient = client.connection.getClient()
    return { client, db, mongoClient }
}
