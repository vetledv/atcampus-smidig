import { fetchReactQuery, useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { Group } from 'types/groups'

const GroupPage = () => {
    const router = useRouter()
    const routerQuery = router.query
    const group = useGroup(routerQuery.group as string)

    if (group.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error</div>
    }
    return (
        <div>
            {group.data && (
                <div>
                    <h1>{group.data.groupName}</h1>
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps(context: {
    query: { group: string }
}) {
    const { group } = context.query
    console.log(group)
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group, Error>(
        ['group', group],
        async () => {
            const res = await fetch(`${baseUrl}/api/groups`)
            const data = await res.json()
            return data
        }
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default GroupPage
