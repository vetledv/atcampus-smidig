import FlatButton from 'components/buttons/FlatButton'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import MessageComponent from 'components/groups/MessageComponent'
import { postJSON, useGroup } from 'hooks/useGroups'
import { baseUrl } from 'lib/constants'
import { ObjectId } from 'mongodb'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { dehydrate, QueryClient, useMutation } from 'react-query'
import Image from 'next/image'
import { Group, GroupMessages, Member } from 'types/groups'
import GroupNav from 'components/groups/GroupNav'
import Head from 'next/head'
import GroupCalendar from 'components/groups/Calendar'
import SocketIOClient, { Socket } from 'socket.io-client'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface AddMutateObj {
    groupId: ObjectId
    admin: Member
    userToAdd: Member
    action: 'ADD' | 'REMOVE'
}

const GroupPage = () => {
    const router = useRouter()
    const routerQuery = router.query
    const session = useSession()
    const group = useGroup(routerQuery.group as string)

    const [activeMembers, setActiveMembers] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0)
    const [connected, setConnected] = useState<boolean>(false)
    const [userTyping, setUserTyping] = useState<string>('')
    const [connectedUsers, setConnectedUsers] = useState<string[]>([])

    const socket = useRef<Socket>(null)
    //initialize socket
    useEffect(() => {
        if (!routerQuery.group) return
        socket.current = SocketIOClient(process.env.NEXTAUTH_URL, {
            path: '/api/groups/socket',
            query: {
                room: routerQuery.group as string,
            },
        })
        socket.current.on('connect', () => {
            console.log('socket connected, id:', socket.current.id)
            //join a room
            socket.current.emit('create', routerQuery.group)
            setConnected(true)
            console.log('joined room')
            console.log(socket.current)
        })
        const currSocket = socket.current
        currSocket.connect()
        return () => {
            currSocket.emit('leave', routerQuery.group)
            currSocket.close()
        }
    }, [routerQuery.group])

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
        })
        socket.current.on('disconnect', () => {
            socket.current.emit('leave', routerQuery.group)
            socket.current.emit('active', routerQuery.group)
            console.log('socket disconnected MessageComponent')
            setConnected(false)
        })
    }, [routerQuery.group])

    const groupNavTabs = ['Generelt', 'Medlemmer', 'Chat', 'Kalender']

    const adminMutatePending = useMutation(
        (object: AddMutateObj) =>
            postJSON(`/api/groups/handlependingmembers`, object),
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

    const handlePendingMember = useCallback(
        async (userToAdd: Member, action: 'ADD' | 'REMOVE') => {
            const addMutateObj: AddMutateObj = {
                groupId: group.data._id,
                admin: group.data.admin,
                userToAdd,
                action,
            }
            adminMutatePending.mutateAsync(addMutateObj)
        },
        [adminMutatePending, group?.data?._id, group?.data?.admin]
    )

    const isAdmin = useCallback(() => {
        if (!session?.data?.user || !group.data) return false
        return session?.data?.user?.id === group.data?.admin.userId?.toString()
    }, [group, session])

    const renderAdminPanel = useCallback(() => {
        if (!isAdmin()) return null
        return (
            <div className='flex flex-col gap-2'>
                <h1>Pending members:</h1>
                {group.data.pendingMembers.map((pendingMember) => (
                    <div
                        key={pendingMember.userId.toString()}
                        className='flex flex-row gap-2'>
                        <div>{pendingMember.userName}</div>
                        <div className='flex gap-2'>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'ADD')
                                }}>
                                Add to group
                            </FlatButton>
                            <FlatButton
                                onClick={() => {
                                    handlePendingMember(pendingMember, 'REMOVE')
                                }}>
                                Decline
                            </FlatButton>
                        </div>
                    </div>
                ))}
                {group.data.pendingMembers.length === 0 && (
                    <div>No pending members</div>
                )}
            </div>
        )
    }, [group.data?.pendingMembers, handlePendingMember, isAdmin])

    const head = (
        <Head>
            <title>
                {group.data ? 'Grupper - ' + group.data?.groupName : 'Grupper'}
            </title>
        </Head>
    )

    if (group.isLoading || adminMutatePending.isLoading) {
        return (
            <>
                {head}
                <div>Loading...</div>
            </>
        )
    }
    if (group.isError) {
        return (
            <>
                {head}
                <div>Error: {group.error.message}</div>
            </>
        )
    }

    return (
        <>
            {head}
            {group.data && (
                <>
                    <GroupHeader
                        group={group.data}
                        activeMembers={activeMembers}
                    />
                    <GroupNav
                        tabs={groupNavTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <div className='grid h-full min-h-screen grid-cols-1 bg-gray-50 p-4 lg:grid-cols-4'>
                        <div className='col-span-1 lg:col-span-3'>
                            {activeTab === 0 && (
                                <div className='flex flex-col gap-2'>
                                    <p>{group.data.description}</p>
                                    <h1>Tags:</h1>
                                    {group.data.tags?.map((tag) => (
                                        <div
                                            className='bg-pink-300 rounded-md w-fit px-4'
                                            key={tag}>
                                            {tag}
                                        </div>
                                    ))}

                                    {group.data.admin?.userId && (
                                        <div>
                                            <span className='font-semibold'>
                                                Admin:{' '}
                                            </span>
                                            {group.data.admin.userName}
                                        </div>
                                    )}
                                    {renderAdminPanel()}
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div className='flex flex-col gap-2 bg-red-300'>
                                    {group.data.members?.map((member) => (
                                        <div
                                            key={member.userId.toString()}
                                            className='flex flex-row gap-2'>
                                            <Image
                                                src={member.picture}
                                                alt=''
                                                width={48}
                                                height={48}
                                                className='rounded-full'
                                            />
                                            <div className='flex flex-col'>
                                                <div className='font-semibold'>
                                                    {member.userName}
                                                </div>
                                                {member.userId ===
                                                group.data.admin?.userId ? (
                                                    <div className='italic'>
                                                        Admin
                                                    </div>
                                                ) : (
                                                    <div className='italic'>
                                                        Gruppemedlem
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className='col-span-1 lg:col-span-3'>
                                    <MessageComponent
                                        groupId={group.data._id}
                                        groupName={group.data.groupName}
                                        groupMembers={group.data.members}
                                        connected={connected}
                                        socket={socket}
                                        activeTab={activeTab}
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
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/login',
            },
        }
    }
    const { group } = context.query

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<Group, Error>(
        ['group', group],
        async () => {
            const res = await fetch(`${baseUrl}/api/groups/${group}`)
            const data = await res.json()
            return data
        }
    )
    await queryClient.prefetchQuery<GroupMessages, Error>(
        ['messages', group],
        async () => {
            const res = await fetch(`${baseUrl}/api/groups/${group}/messages}`)
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
