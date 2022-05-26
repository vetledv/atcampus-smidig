import SubjectCard from 'components/cards/SubjectCard'
import FindOrCreateBtn from 'components/findgroups/FindOrCreateBtn'
import Tabs from 'components/groups/Tabs'
import Head from 'next/head'
import { useState } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Group } from 'types/groups'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { baseUrl } from 'lib/constants'

interface PaginatedGroups {
    groups: Group[]
    totalPages: number
    totalGroups: number
}

const Groups = () => {
    const [page, setPage] = useState(1)
    const fetchProjects = (page = 1) =>
        fetch('/api/groups?page=' + page).then((res) => res.json())
    const groups = useQuery<PaginatedGroups, Error>(
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
                        ' h-fit px-4 py-2 border border-purple-4' +
                        (i === page
                            ? ' bg-purple-1 text-white '
                            : 'bg-white hover:bg-dark-6')
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
        <>
            <Head>
                <title>Grupper</title>
            </Head>{' '}
            <div className='flex flex-col gap-6 pb-6 w-full min-h-'>
                <div className='flex flex-col w-full gap-2 bg-white'>
                    <div className='flex flex-row gap-2 p-6 items-center'>
                        <h1 className='text-2xl text-dark-1'>
                            Kollokviegrupper
                        </h1>
                        <div className='px-3 bg-dark-6 h-fit rounded-full'>
                            Beta
                        </div>
                    </div>
                    <Tabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={tabs}></Tabs>
                </div>
                <div className='px-4 md:px-6 grid grid-cols-1 lg:grid-cols-4 h-full flex-grow'>
                    {activeTab === 0 && groups.data && (
                        <div className=' col-span-1 lg:col-span-3 flex flex-col gap-4 min-h-[500px] justify-between  h-full '>
                            {groups.data.groups.length === 0 ? (
                                <div>
                                    <p>Not in any groups.</p>
                                </div>
                            ) : (
                                <div className='flex flex-wrap'>
                                    {groups.data.groups.map((group) => (
                                        <div
                                            className='md:basis-1/2 w-full 2xl:basis-1/3'
                                            key={group._id.toString()}>
                                            <div className='pr-2 pb-2 h-full'>
                                                <SubjectCard
                                                    key={group.groupName}
                                                    groupName={group.groupName}
                                                    groupId={group._id}
                                                    groupImage={
                                                        'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                                                    }
                                                    compact={true}
                                                    subjectCode={'PG63'}
                                                    members={
                                                        group.members.length
                                                    }
                                                    totalMembers={
                                                        group.members.length
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}{' '}
                            <div className='flex gap-1 pt-12'>
                                <div>Mangler gruppen din?</div>
                                <div>Lag en ny gruppe helt anonymt!</div>
                            </div>
                            <div className='flex bg-white border border-purple-4 rounded-lg py-3 px-6 justify-between shadow-sm shadow-purple-5 items-center'>
                                <div className='flex gap-1 justify-end text-sm h-fit'>
                                    Viser {(page - 1) * 5 + 1} til{' '}
                                    {groups.data.groups.length + (page - 1) * 5}{' '}
                                    av {groups.data.totalGroups} grupper
                                </div>
                                <div className='flex'>
                                    <button
                                        className={
                                            ' px-2 rounded-tl-lg rounded-bl-lg border-l border-t border-b  ' +
                                            (page !== 1
                                                ? 'hover:bg-dark-6'
                                                : '')
                                        }
                                        onClick={() =>
                                            setPage((old) =>
                                                Math.max(old - 1, 0)
                                            )
                                        }
                                        disabled={page === 1}>
                                        <ChevronLeftIcon className='w-5 h-5 text-dark-3' />
                                    </button>
                                    {renderPagination()}
                                    <button
                                        className={
                                            ' px-2 rounded-tr-lg rounded-br-lg border-r border-t border-b ' +
                                            (hasNextPage
                                                ? 'hover:bg-dark-6'
                                                : '')
                                        }
                                        onClick={() => {
                                            if (
                                                !groups.isPreviousData &&
                                                hasNextPage
                                            ) {
                                                setPage((old) => old + 1)
                                            }
                                        }}
                                        disabled={
                                            groups.isPreviousData ||
                                            !hasNextPage
                                        }>
                                        <ChevronRightIcon className='w-5 h-5 text-dark-3' />
                                    </button>
                                </div>
                            </div>
                            {/* {groups.isFetching ? <span> Loading...</span> : null} */}
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
        </>
    )
}

export default Groups

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<PaginatedGroups, Error>(
        ['groups', 1],
        async () => {
            const res = await fetch(`${baseUrl}/api/groups?page=1`)
            return res.json()
        }
    )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
