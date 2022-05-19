import { Db, MongoClient } from 'mongodb'
import { mongodb_name, mongodb_url } from './constants'

if (!mongodb_url) {
    throw new Error('MONGODB_URL is not defined')
}

let promise: Promise<MongoClient> = null
let cachedClient: MongoClient = null
let cachedDb: Db = null

export const connectToDB = async () => {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        }
    }
    if (!promise) {
        promise = MongoClient.connect(mongodb_url)
    }

    const client = await promise
    const db = client.db(mongodb_name)
    cachedClient = client
    cachedDb = db
    return { client: cachedClient, db: cachedDb }
}
