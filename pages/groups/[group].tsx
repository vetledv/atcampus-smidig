import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import dotenv from 'dotenv'

const GroupPage = () => {
    const router = useRouter()
    const query = router.query
    const rQuery = useQuery(['group', query.group], () => {
        return fetch(`/api/groups/${query.group}`)
            .then((res) => res.json())
            .then((res) => res)
    })
    if (rQuery.isLoading) {
        return <div>Loading...</div>
    }
    if (rQuery.isError) {
        return <div>Error</div>
    }
    return (
        <div>
            {rQuery.data && (
                <div>
                    <h1>{rQuery.data.groupName}</h1>
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps(context) {
    dotenv.config()
    const baseUrl = process.env.NEXTAUTH_URL
    const query = context.query
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['group', query.group], () => {
        return fetch(`${baseUrl}/api/groups/${query.group}`)
            .then((res) => res.json())
            .then((res) => res)
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default GroupPage
