import SubjectCard from 'components/cards/SubjectCard'
import { useGroups } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { dehydrate, QueryClient } from 'react-query'
import type { Group } from 'types/groups'

const Groups = () => {
    const groups = useGroups()
    if (groups.isLoading) {
        return <div>Loading...</div>
    }
    if (groups.isError) {
        return <div>Error: {groups.error.message}</div>
    }
    return (
        <div>
            {groups.data && (
                <div>
                    <h1>Groups</h1>
                    <ul className='flex flex-wrap gap-4'>
                        {groups.data.length === 0 ? (
                            <div>
                                <p>Not in any groups.</p>
                            </div>
                        ) : (
                            <>
                                {groups.data.map((group) => (
                                    <li key={group.groupName}>
                                        <SubjectCard
                                            groupName={group.groupName}
                                            groupImage={
                                                'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                                            }
                                            compact={true}
                                            subjectCode={'PG63'}
                                            members={group.members.length}
                                            totalMembers={group.members.length}
                                        />
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Groups

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group[], Error>('groups', async () => {
        const res = await fetch(`${baseUrl}/api/groups`)
        const data = await res.json()
        return data
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
