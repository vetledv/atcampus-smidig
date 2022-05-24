import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <>Loading...</>
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <h1>Home</h1>
                <button onClick={() => router.push('auth/login')}>Login</button>
            </>
        )
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={() => signOut()}>Logout</button>
            <>dont add shit here</>
        </>
    )
}
export default HomePage
