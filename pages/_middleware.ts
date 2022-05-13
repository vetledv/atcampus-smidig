import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, res: NextResponse) {
    const secret_key = process.env.NEXT_AUTH_SECRET

    const url = req.nextUrl.clone()
    if (url.pathname === '/') {
        const session = await getToken({ req, secret: secret_key })
        url.pathname = 'auth/login'
        if (!session) return NextResponse.redirect(url)
    }
    return NextResponse.next()
}
