import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(session)

    if (status === 'loading') {
        return <>Loading...</>
    }
    return <>dont add shit here</>
}
export default HomePage
