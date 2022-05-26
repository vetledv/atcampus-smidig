import SubjectCard from 'components/cards/SubjectCard'
import FindOrCreateBtn from 'components/findgroups/FindOrCreateBtn'
import GroupNav from 'components/groups/GroupNav'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'

const Groups = () => {
    const [page, setPage] = useState(1)
    const fetchProjects = (page = 1) =>
        fetch('/api/groups?page=' + page).then((res) => res.json())
    const groups = useQuery<any, Error>(
        ['groups', page],
        () => fetchProjects(page),
        { keepPreviousData: true }
    )

    const hasNextPage = groups.data?.totalPages > page
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['Mine grupper', 'Finn ny gruppe']

    const renderPagination = () => {
        const pages = []
        for (let i = 1; i <= groups.data?.totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={
                        ' h-fit px-4 py-2 border border-gray-300 rounded-lg ' +
                        (i === page ? ' bg-pink-300' : 'bg-white')
                    }
                    onClick={() => setPage(i)}>
                    {i}
                </button>
            )
        }
        return pages
    }

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
            <div className='pl-6 grid grid-cols-1 lg:grid-cols-4'>
                {activeTab === 0 && groups.data && (
                    <div className=' col-span-1 lg:col-span-3'>
                        {groups.data.length === 0 ? (
                            <div>
                                <p>Not in any groups.</p>
                            </div>
                        ) : (
                            <div className='flex flex-wrap gap-2 min-h-[328px]'>
                                {groups.data.groups.map((group) => (
                                    <SubjectCard
                                        key={group.groupName}
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
                                ))}
                            </div>
                        )}
                        <div className='flex gap-2'>
                            <button
                                onClick={() =>
                                    setPage((old) => Math.max(old - 1, 0))
                                }
                                disabled={page === 1}>
                                Previous Page
                            </button>
                            {renderPagination()}
                            <button
                                onClick={() => {
                                    if (!groups.isPreviousData && hasNextPage) {
                                        setPage((old) => old + 1)
                                    }
                                }}
                                disabled={
                                    groups.isPreviousData || !hasNextPage
                                }>
                                Next Page
                            </button>
                        </div>
                        {/* {groups.isFetching ? <span> Loading...</span> : null} */}
                        <div className='flex gap-1 pt-12'>
                            <div>Mangler gruppen din?</div>
                            <div>Lag en ny gruppe helt anonymt!</div>
                        </div>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className='col-span-1 lg:col-span-3 flex flex-row gap-4'>
                        <FindOrCreateBtn>Finn ny Gruppe</FindOrCreateBtn>
                        <FindOrCreateBtn>Lag ny Gruppe</FindOrCreateBtn>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Groups
