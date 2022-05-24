import dotenv from 'dotenv'

dotenv.config()

export const baseUrl = process.env.NEXTAUTH_URL
export const secret_key = process.env.SECRET_KEY

export const mongodb_url = process.env.MONGODB_URL
export const mongodb_name = process.env.MONGODB_NAME
export const mongodb_auth_name = process.env.MONGODB_AUTH_NAME

export const google_client_id = process.env.GOOGLE_CLIENT_ID
export const google_client_secret = process.env.GOOGLE_CLIENT_SECRET
export const google_refresh_token = process.env.GOOGLE_REFRESH_TOKEN
export const imgur_client_id = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID
