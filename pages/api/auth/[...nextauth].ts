import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import {
    google_client_id,
    google_client_secret,
    mongodb_name,
    mongodb_url,
    secret_key,
} from 'lib/constants'
import { MongoClient } from 'mongodb'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from 'lib/mongodb'

const clientold = new MongoClient(mongodb_url + mongodb_name) //MONGODB_URL?

const mongodb = connectToDB()
const clientPromise = clientold.connect()
const clientPromiseNew = mongodb.then((mongodb) => mongodb.client.connect())

export default NextAuth({
    secret: secret_key,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        updateAge: 30 * 60 * 1000, // 30 minutes
    },
    providers: [
        GoogleProvider({
            clientId: google_client_id,
            clientSecret: google_client_secret,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: 'openid profile email',
                },
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user = token.user
            // console.log('SESSION: ', session)
            //console.log('TOKEN:', token)
            return session
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            if (user) {
                token.user = user
            }
            return token
        },
    },
    adapter: MongoDBAdapter(clientPromiseNew),
    pages: {
        signIn: '/api/auth/login',
        signOut: '/api/auth/logout',
        error: '/api/auth/error',
    },
})
