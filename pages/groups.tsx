import SubjectCard from 'components/cards/SubjectCard'
import FindOrCreateBtn from 'components/findgroups/FindOrCreateBtn'
import GroupNav from 'components/groups/GroupNav'
import { useGroups } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import Head from 'next/head'
import { useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import type { Group } from 'types/groups'

const Groups = () => {
    const groups = useGroups()
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
                                {groups.data.map((group) => (
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

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group[], Error>('groups', async () => {
        const res = await fetch(`${baseUrl}/api/groups`)
        return res.json()
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
