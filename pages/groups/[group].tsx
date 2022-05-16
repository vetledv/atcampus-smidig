import { fetchReactQuery, useGroup } from 'hooks/useGroups'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { Group } from 'types/groups'

const GroupPage = () => {
    const router = useRouter()
    const { groupName } = router.query
    const group = useGroup(groupName as string)

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
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group, Error>(
        ['group', group],
        fetchReactQuery(`groups/${group}`)
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default GroupPage
