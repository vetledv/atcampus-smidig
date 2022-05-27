import { NextPage } from 'next'
import {
    getSession,
    GetSessionParams,
    signOut,
    useSession,
} from 'next-auth/react'
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

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default HomePage
