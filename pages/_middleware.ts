import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, res: NextResponse) {
    const secret_key = process.env.SECRET_KEY

    const session = await getToken({ req, secret: secret_key })
    const url = req.nextUrl.clone()

    //redirect logged in users to the homepage when they try to access login
    if (url.pathname.startsWith('/auth/')) {
        if (session) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    } else {
        if (!session && !url.pathname.startsWith('/api/auth' || '/auth/')) {
            url.pathname = '/auth/login'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}
