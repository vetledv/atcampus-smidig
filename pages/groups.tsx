import SubjectCard from 'components/cards/SubjectCard'
import FindOrCreateBtn from 'components/findgroups/FindOrCreateBtn'
import Tabs from 'components/groups/Tabs'
import { baseUrl } from 'lib/constants'
import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { PaginatedGroups } from 'types/groups'
import PaginationNav from './../components/PaginationNav'

const Groups = () => {
    const [page, setPage] = useState(1)
    const fetchPaginated = (page = 1) =>
        fetch('/api/groups?page=' + page).then((res) => res.json())
    const groups = useQuery<PaginatedGroups, Error>(
        ['groups', page],
        () => fetchPaginated(page),
        { keepPreviousData: true }
    )
    const router = useRouter()

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
        <>
            <Head>
                <title>Kollokviegrupper </title>
            </Head>{' '}
            <div className='flex flex-col gap-6 pb-6 w-full'>
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
                <div className='px-4 md:px-6 grid grid-cols-1 xl:grid-cols-4 h-full flex-grow'>
                    {activeTab === 0 && groups.data && (
                        <div className=' col-span-1 xl:col-span-3 flex flex-col gap-4 min-h-[600px] justify-between h-full max-w-5xl'>
                            <div className='flex flex-wrap'>
                                {groups.data?.groups?.map((group) => (
                                    <div
                                        className='md:basis-1/2 sm:basis-1/2 w-full 2xl:basis-1/3 xs:basis-auto '
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
                                                members={group.members.length}
                                                totalMembers={
                                                    group.members.length
                                                }
                                                onClick={() => {
                                                    router.push(
                                                        '/groups/' + group._id
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {groups.data.groups.length === 0 && (
                                <div>
                                    <p>Not in any groups.</p>
                                </div>
                            )}
                            <div className='flex gap-1 pb-4'>
                                <div>Mangler gruppen din?</div>
                                <div
                                    onClick={() => {
                                        router.push('/groups/create')
                                    }}
                                    className='hover:text-purple-2 cursor-pointer'>
                                    Lag en ny gruppe!
                                </div>
                            </div>
                            <PaginationNav
                                isPreviousData={groups.isPreviousData}
                                hasNextPage={hasNextPage}
                                data={groups.data}
                                page={page}
                                setPage={setPage}
                                limit={groups.data.limit}
                            />
                            {/* {groups.isFetching ? <span> Loading...</span> : null} */}
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div className='flex-wrap justify-center sm:justify-start py-3 col-span-1 lg:col-span-3 flex flex-row gap-4'>
                            <FindOrCreateBtn
                                onClick={() => {
                                    router.push('/groups/findgroup')
                                }}>
                                Finn ny Gruppe
                            </FindOrCreateBtn>
                            <FindOrCreateBtn
                                onClick={() => router.push('/groups/create')}>
                                Lag ny Gruppe
                            </FindOrCreateBtn>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Groups

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    const queryClient = new QueryClient()
    //why this no work
    // await queryClient.prefetchQuery<PaginatedGroups, Error>(
    //     ['groups', 1],
    //     async () => {
    //         const res = await fetch(baseUrl + '/api/groups?page=1')
    //         return await res.json()
    //     }
    // )
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
