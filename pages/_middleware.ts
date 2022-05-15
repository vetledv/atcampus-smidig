import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, res: NextResponse) {
    const secret_key = process.env.NEXT_AUTH_SECRET

    const session = await getToken({ req, secret: secret_key })
    const url = req.nextUrl.clone()

    //redirect logged in users to the homepage when they try to access login
    if (url.pathname.startsWith('/auth/')) {
        if (session) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }
    //redirect non-logged in users to the login page when they try to access pages
    if (url.pathname === '/') {
        console.log(session)
        url.pathname = 'auth/login'
        if (!session) return NextResponse.redirect(url)
    }
    return NextResponse.next()
}
