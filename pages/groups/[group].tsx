import { useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import type { Group } from 'types/groups'

const GroupPage = () => {
    const router = useRouter()
    const routerQuery = router.query
    const session = useSession()
    console.log(session)
    const group = useGroup(routerQuery.group as string)

    if (group.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error: {group.error.message}</div>
    }
    return (
        <div>
            {group.data && (
                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-lg'>
                        {group.data.groupName}
                    </h1>
                    <p>{group.data.description}</p>
                    <h1>Tags:</h1>

                    {group.data.tags?.map((tag) => (
                        <div
                            className='bg-pink-300 rounded-md w-fit px-4'
                            key={tag}>
                            {tag}
                        </div>
                    ))}

                    {group.data.admin && (
                        <p>
                            <span className='font-semibold'>Admin:</span>{' '}
                            {group.data.admin.userName}
                        </p>
                    )}
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
