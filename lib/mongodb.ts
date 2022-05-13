import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose'
import { Db } from 'mongoose/node_modules/mongodb'

dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_NAME = process.env.MONGODB_NAME

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined')
}
let cachedClient: Mongoose = null
let cachedDb: Db = null

export const connectToDB = async () => {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }
    const client: Mongoose = await mongoose.connect(MONGODB_URL)
    const db: Db = client.connection.db
    cachedClient = client
    cachedDb = db
    return { client, db }
}
