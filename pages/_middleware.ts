import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export async function middleware(req: NextRequest, res: NextResponse) {
    //redirect any path to login if not authenticated
}
