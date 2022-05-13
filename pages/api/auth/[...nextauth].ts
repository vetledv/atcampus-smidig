import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import dotenv from 'dotenv'

dotenv.config()

export default NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        updateAge: 30 * 60 * 1000, // 30 minutes
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            session.user = token.user
            console.log('SESSION: ', session)
            //console.log('TOKEN:', token)
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.accessToken = account.access_token
            }
            if (user) {
                token.user = user
            }
            return token
        },
    },
    pages: {
        signIn: '/api/auth/login',
        signOut: '/api/auth/logout',
        error: '/api/auth/error',
    },
})
