import FlatButton from '@/components/general/FlatButton'
import GroupHeader from '@/components/groups/GroupHeaderMobile'
import Stepper from '@/components/groups/Stepper'
import Tabs from '@/components/groups/Tabs'
import { postJSON, useGroup } from '@/hooks/useGroups'
import useGroupSocket from '@/hooks/useGroupSocket'
import { baseUrl } from '@/lib/constants'
import { getSession, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { dehydrate, QueryClient, useMutation } from 'react-query'
import type { GetSessionParams } from 'next-auth/react'
import type {
    AddOrRemoveMember,
    Group,
    GroupMessages,
    Member,
} from '@/types/groups'
const GroupCalendar = dynamic(() => import('../../components/groups/Calendar'))
const Chat = dynamic(() => import('../../components/groups/chat/Chat'))
const MemberItem = dynamic(() => import('../../components/groups/MemberItem'))

const GroupPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const routerQuery = router.query
    const group = useGroup(routerQuery.group as string)
    const { socket, connected, setConnected } = useGroupSocket(
        [routerQuery.group],
        routerQuery.group as string
    )

    const [activeMembers, setActiveMembers] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [userTyping, setUserTyping] = useState<string>('')
    const groupNavTabs = ['Generelt', 'Medlemmer', 'Chat', 'Kalender']

    const { mutateAsync: leaveGroupAsync } = useMutation(
        (userId: string) =>
            postJSON(`/api/groups/${routerQuery.group}/leave`, userId),
        {
            onSuccess: () => {
                router.push('/groups')
            },
        }
    )
    const adminMutatePending = useMutation(
        (object: AddOrRemoveMember) =>
            postJSON(
                `/api/groups/${routerQuery.group}/handlependingmembers`,
                object
            ),
        {
            onSuccess: () => {
                console.log('success')
                group.refetch()
            },
            onError: (err) => {
                console.log(err)
            },
        }
    )

    //socket events
    useEffect(() => {
        if (socket.current === null) return
        socket.current.on('active-members', (data) => {
            console.log('active:', data)
            setActiveMembers(data)
        })
        socket.current.on(
            `message ${routerQuery.group as string}`,
            (message) => {
                console.log('message received:', message)
            }
        )
        socket.current.on(`typing`, (data, user: string) => {
            console.log('typing group.tsx:', data, 'user: ', user)
        })
        socket.current.on(`stopped-typing`, (data, user) => {
            console.log('stopped typing group.tsx:', data, 'user: ', user)
            if (activeTab !== 2) {
                setUserTyping('')
            }
        })
        socket.current.on('disconnect', () => {
            socket.current?.emit('leave', routerQuery.group)
            socket.current?.emit('active', routerQuery.group)
            console.log('socket disconnected MessageComponent')
            setConnected(false)
        })
    }, [activeTab, routerQuery.group, setConnected, socket])

    const handleLeaveGroup = useCallback(() => {
        if (!session) return
        leaveGroupAsync(session.user.id as string)
    }, [leaveGroupAsync, session])

    const handlePendingMember = useCallback(
        async (userToAdd: Member, action: 'ADD' | 'REMOVE') => {
            if (!group.data) return
            const addMutateObj: AddOrRemoveMember = {
                groupId: group.data._id,
                admin: group.data.admin,
                userToAdd,
                action,
            }
            adminMutatePending.mutateAsync(addMutateObj)
        },
        [adminMutatePending, group.data]
    )

    const isAdmin = useCallback(() => {
        if (!session?.user || !group.data) return false
        return session.user?.id === group.data?.admin?.userId?.toString()
    }, [group, session])

    const renderAdminPanel = useCallback(() => {
        if (!group?.data) return null
        if (!isAdmin()) return null
        return (
            <div className='flex flex-col gap-2'>
                <h1 className=' font-semibold'>Ventende medlemmer</h1>
                {group.data.pendingMembers.map((pendingMember) => (
                    <div
                        key={pendingMember.userId?.toString()}
                        className='flex flex-row gap-2'>
                        <div>{pendingMember.userName}</div>
                        <div className='flex gap-2'>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'ADD')
                                }}>
                                {adminMutatePending.isLoading
                                    ? 'Loading...'
                                    : 'Godkjenn'}
                            </FlatButton>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'REMOVE')
                                }}>
                                {adminMutatePending.isLoading
                                    ? 'Loading...'
                                    : 'Avvis'}
                            </FlatButton>
                        </div>
                    </div>
                ))}
                {group.data.pendingMembers.length === 0 && (
                    <p>Ingen ventende medlemmer.</p>
                )}
            </div>
        )
    }, [adminMutatePending.isLoading, group.data, handlePendingMember, isAdmin])

    if (group.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error</div>
    }

    return (
        <>
            <Head>
                <title>
                    {group.data
                        ? 'Kollokviegrupper  - ' + group.data?.groupName
                        : 'Kollokviegrupper '}
                </title>
            </Head>
            {group.data && (
                <>
                    <Stepper
                        groupId={group.data._id?.toString()}
                        groupName={group.data.groupName}
                    />
                    <GroupHeader
                        leave={handleLeaveGroup}
                        group={group.data}
                        activeMembers={activeMembers}
                        isAdmin={isAdmin()}
                    />
                    <Tabs
                        tabs={groupNavTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <div className='grid h-full min-h-fit grid-cols-1 p-4 lg:grid-cols-4 font-serif text-dark-1'>
                        <div className='col-span-1 p-4 lg:col-span-3 bg-white border border-purple-4 rounded-lg h-fit max-w-5xl'>
                            {activeTab === 0 && (
                                <div className='flex flex-col gap-2'>
                                    <div className='border-b'>
                                        <p className='p-2 w-fit'>
                                            {group.data?.description}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className='font-semibold'>Skole</h1>
                                        <div className='bg-purple-2 rounded-md w-fit px-4 py-1 font-sm text-white'>
                                            {group.data?.tags?.school}
                                        </div>
                                    </div>
                                    <h1 className='font-semibold'>Fag</h1>
                                    <div className='bg-purple-2 rounded-md w-fit px-4 py-1 font-sm text-white'>
                                        {group.data?.tags?.course}
                                    </div>
                                    <h1 className='font-semibold'>Goals</h1>
                                    <div className='flex flex-wrap gap-2 w-1/2'>
                                        {group.data.tags?.goals?.map((tag) => (
                                            <div
                                                className='border-2 border-purple-4 rounded-md w-fit px-4 font-sm'
                                                key={tag}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                    {group.data.admin?.userId && (
                                        <>
                                            <h1 className='font-semibold'>
                                                Admin
                                            </h1>
                                            <div className=' font-regular w-fit'>
                                                {group.data.admin.userName}
                                            </div>
                                        </>
                                    )}
                                    {renderAdminPanel()}
                                </div>
                            )}
                            {activeTab === 1 &&
                                group.data.members.map((member, i) => (
                                    <MemberItem
                                        key={member.userId}
                                        member={member}
                                        adminId={group.data.admin?.userId}
                                    />
                                ))}
                            {activeTab === 2 && (
                                <div className='col-span-1 lg:col-span-3'>
                                    <Chat
                                        group={group.data}
                                        connected={connected}
                                        socket={socket}
                                        userTyping={userTyping}
                                        setUserTyping={setUserTyping}
                                    />
                                </div>
                            )}
                            {activeTab === 3 && <GroupCalendar />}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export const getServerSideProps = async (
    context: GetSessionParams & { query: { group: string } }
) => {
    const { group } = context.query
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
    await queryClient.removeQueries('messages')

    // await queryClient.prefetchQuery<Group, Error>(
    //     ['group', group],
    //     async () => {
    //         const res = await fetch(`${baseUrl}/api/groups/${group}`)
    //         if (!res.ok) {
    //             throw new Error(res.statusText)
    //         } else {
    //             return res.json()
    //         }
    //     }
    // )
    // await queryClient.prefetchQuery<GroupMessages, Error>(
    //     ['messages', group],
    //     async () => {
    //         const res = await fetch(
    //             `${baseUrl}/api/groups/${group}/messages?page=1`
    //         )
    //         if (!res.ok) {
    //             throw new Error(res.statusText)
    //         } else {
    //             return res.json()
    //         }
    //     }
    // )

    return {
        props: {
            // dehydratedState: dehydrate(queryClient),
            session,
        },
    }
}
export default GroupPage
