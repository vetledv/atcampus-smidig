import { NextPage } from 'next'
import {
    getSession,
    GetSessionParams,
    signOut,
    useSession,
} from 'next-auth/react'
import { useRouter } from 'next/router'
import FlatButton from '@/components/general/FlatButton'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <>Laster inn...</>
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <h1>Oversikt</h1>
                <button onClick={() => router.push('auth/login')}>Login</button>
            </>
        )
    }
    return (
        <>
            <h1>Oversikt</h1>
            <div className='grid grid-cols-2 gap-12 md:grid-cols-8 md:gap-2 lg:text-center lg:grid-col-10 lg:gap-5 '>
            <FlatButton className='bg-logout-red flex col-start-6 col-end-6 col col-span-2 justify-center lg:text-center' onClick={() => signOut()}>Logg ut</FlatButton></div>
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
        props: {
            session,
        },
    }
}

export default HomePage
