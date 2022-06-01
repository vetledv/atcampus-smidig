import dotenv from 'dotenv'

dotenv.config()

export const baseUrl = process.env.NEXTAUTH_URL as string
export const secret_key = process.env.SECRET_KEY as string

export const mongodb_url = process.env.MONGODB_URL as string
export const mongodb_name = process.env.MONGODB_NAME as string
export const mongodb_auth_name = process.env.MONGODB_AUTH_NAME as string

export const google_client_id = process.env.GOOGLE_CLIENT_ID as string
export const google_client_secret = process.env.GOOGLE_CLIENT_SECRET as string
export const google_refresh_token = process.env.GOOGLE_REFRESH_TOKEN as string
