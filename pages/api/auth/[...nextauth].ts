import {
    google_client_id,
    google_client_secret,
    secret_key,
} from 'lib/constants'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

//const mongodb = connectToDB()
//const clientPromise = mongodb.then((mongodb) => mongodb.client.connect())

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
            // authorization: {
            //     params: {
            //         prompt: 'consent',
            //         access_type: 'offline',
            //         response_type: 'code',
            //         scope: 'openid profile email',
            //     },
            // },
            profile(profile) {
                console.log('profile: ', profile.sub)
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
            session.user = token.user as any
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
    //adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/api/auth/login',
        signOut: '/api/auth/logout',
        error: '/api/auth/error',
    },
})
