import SubjectCard from 'components/cards/SubjectCard'
import FindOrCreateBtn from 'components/findgroups/FindOrCreateBtn'
import GroupNav from 'components/groups/GroupNav'
import { useGroups } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import Head from 'next/head'
import { useState } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import type { Group } from 'types/groups'

const Groups = () => {
    const [page, setPage] = useState(1)
    const fetchProjects = (page = 1) =>
        fetch('/api/groups?page=' + page).then((res) => res.json())
    const groups = useQuery<any, Error>(
        ['groups', page],
        () => fetchProjects(page),
        {
            keepPreviousData: true,
        }
    )
    // check if groups.data.totalPages is greater than page
    const hasNextPage = groups.data?.totalPages > page
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['Mine grupper', 'Finn ny gruppe']
    if (groups.isLoading) {
        return (
            <>
                <Head>
                    <title>Grupper</title>
                </Head>
                <div>Loading...</div>
            </>
        )
    }
    if (groups.isError) {
        return (
            <>
                <Head>
                    <title>Grupper</title>
                </Head>
                <div>Error: {groups.error.message}</div>
            </>
        )
    }
    return (
        <div className='flex flex-col gap-6'>
            <Head>
                <title>Grupper</title>
            </Head>
            <div className='flex flex-col gap-2 bg-white'>
                <div className='flex flex-row gap-2 p-6 items-center'>
                    <h1 className='text-2xl text-dark-1'>Kollokviegrupper</h1>
                    <div className='px-3 bg-dark-6 h-fit rounded-full'>
                        Beta
                    </div>
                </div>
                <GroupNav
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}></GroupNav>
            </div>
            <div className='pl-6'>
                {activeTab === 0 && groups.data && (
                    <ul className='flex flex-wrap gap-4'>
                        {groups.data.length === 0 ? (
                            <div>
                                <p>Not in any groups.</p>
                            </div>
                        ) : (
                            <>
                                {groups.data.groups.map((group) => (
                                    <li key={group.groupName}>
                                        <SubjectCard
                                            groupName={group.groupName}
                                            groupId={group._id}
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
                        <span>Current Page: {page}</span>
                        <button
                            onClick={() =>
                                setPage((old) => Math.max(old - 1, 0))
                            }
                            disabled={page === 1}>
                            Previous Page
                        </button>{' '}
                        <button
                            onClick={() => {
                                if (!groups.isPreviousData && hasNextPage) {
                                    setPage((old) => old + 1)
                                }
                            }}
                            disabled={groups.isPreviousData || !hasNextPage}>
                            Next Page
                        </button>
                        {groups.isFetching ? <span> Loading...</span> : null}{' '}
                    </ul>
                )}
                {activeTab === 1 && (
                    <div className='flex flex-row gap-4'>
                        <FindOrCreateBtn>Finn ny Gruppe</FindOrCreateBtn>
                        <FindOrCreateBtn>Lag ny Gruppe</FindOrCreateBtn>
                    </div>
                )}
                <div className='flex gap-1 pt-12'>
                    <div>Mangler gruppen din?</div>
                    <div>Lag en ny gruppe helt anonymt!</div>
                </div>
            </div>
        </div>
    )
}

export default Groups
