import FlatButton from '@/components/general/FlatButton'
import GroupHeader from '@/components/groups/GroupHeaderMobile'
import Stepper from '@/components/groups/Stepper'
import Tabs from '@/components/groups/Tabs'
import { postJSON, useGroup } from '@/hooks/useGroups'
import useGroupSocket from '@/hooks/useGroupSocket'
import type { AddOrRemoveMember, Member } from '@/types/groups'
import type { GetSessionParams } from 'next-auth/react'
import { getSession, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
const GroupCalendar = dynamic(() => import('../../components/groups/Calendar'))
const Chat = dynamic(() => import('../../components/groups/chat/Chat'))
const MemberItem = dynamic(() => import('../../components/groups/MemberItem'))

const GroupPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const routerQuery = router.query
    const group = useGroup(routerQuery.group as string)

    const [activeMembers, setActiveMembers] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [userTyping, setUserTyping] = useState<string>('')
    const groupNavTabs = ['Generelt', 'Medlemmer', 'Chat', 'Kalender']

    const { mutate: leaveGroup } = useMutation(
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
                group.refetch()
            },
        }
    )

    //socket init
    const { socket, connected, setConnected } = useGroupSocket(
        [routerQuery.group],
        routerQuery.group as string
    )

    //socket events
    useEffect(() => {
        if (socket.current === null) return
        socket.current.on('active-members', (data: number) => {
            setActiveMembers(data)
        })
        socket.current.on(`stopped-typing`, () => {
            // clear user typing if we're not on the chat tab
            if (activeTab !== 2) {
                setUserTyping('')
            }
        })
        socket.current.on('disconnect', () => {
            socket.current?.emit('leave', routerQuery.group)
            socket.current?.emit('active', routerQuery.group)
            setConnected(false)
        })
    }, [activeTab, routerQuery.group, setConnected, socket])

    const handleLeaveGroup = () => {
        if (!session) return
        leaveGroup(session.user.id as string)
    }

    const handlePendingMember = async (
        userToAdd: Member,
        action: 'ADD' | 'REMOVE'
    ) => {
        if (!group.data) return
        const addMutateObj: AddOrRemoveMember = {
            groupId: group.data._id,
            admin: group.data.admin,
            userToAdd,
            action,
        }
        adminMutatePending.mutate(addMutateObj)
    }

    const isAdmin = () => {
        if (!session?.user || !group.data) return false
        return session.user?.id === group.data?.admin?.userId?.toString()
    }

    const renderAdminPanel = () => {
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
    }

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

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session,
        },
    }
}
export default GroupPage
