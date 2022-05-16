import dotenv from 'dotenv'

dotenv.config()

export const baseUrl = process.env.NEXTAUTH_URL
export const secret_key = process.env.NEXT_AUTH_SECRET
