import SubjectCard from 'components/cards/SubjectCard'
import { baseUrl } from 'lib/constants'
import { dehydrate, QueryClient, useQuery } from 'react-query'

const Groups = () => {
    const rQuery = useQuery('groups', () => {
        return fetch(`/api/groups`)
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
                    <h1>Groups</h1>
                    <ul>
                        {rQuery.data.map((group) => (
                            <li key={group.groupName}>
                                <a href={`/groups/${group.groupName}`}>
                                    <SubjectCard
                                        groupName={group.groupName}
                                        groupImage={
                                            'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                                        }
                                        subjectCode={'PG63'}
                                        members={12}
                                        totalMembers={12}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Groups

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('groups', () => {
        return fetch(`${baseUrl}/api/groups`)
            .then((res) => res.json())
            .then((res) => res)
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
