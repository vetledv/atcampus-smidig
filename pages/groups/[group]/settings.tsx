import React from 'react'
import { useRouter } from 'next/router'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import { useGroup } from 'hooks/useGroups'
import AddTag from 'components/groups/settings/AddTag'
import EditTagCard from 'components/groups/settings/EditGroupCard'
import MembersSettings from 'components/groups/settings/MembersSettings'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import TopNav from 'components/groups/TopNav'

const Settings = ({ handleLeaveGroup }) => {
    const router = useRouter()
    const routerQuery = router.query

    const group = useGroup(routerQuery.group as string)
    const { data: session } = useSession()
    //check if admin
    const isAdmin = session?.user.id === group?.data?.admin?.userId

    if (!isAdmin) {
        return <div>Unauthorized</div>
    }

    if (group.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error: {group.error.message}</div>
    }

    return (
        <>
            <TopNav
                groupId={group.data._id.toString()}
                groupName={group.data.groupName}
                settings={true}
            />
            <GroupHeader
                leave={handleLeaveGroup}
                group={group.data}
                activeMembers={0}
                isAdmin={isAdmin}
            />
            {group.data && (
                <div className='flex flex-row justify-start bg-dark-6 py-8 md:flex-wrap sm:flex-wrap '>
                    <div className='px-8 md:mt-8 sm:mt-8'>
                        <EditTagCard
                            groupName={group.data.groupName}
                            groupDescription={group.data.description}
                            groupMaxMembers={group.data.maxMembers}
                        />
                    </div>
                    <div className='px-8 md:mt-8 sm:mt-8'>
                        {/*TODO:Tags changed*/}
                        {/* <AddTag tags={group.data.tags} /> */}
                    </div>
                    <div className='px-8 md:mt-8 sm:mt-8'>
                        <MembersSettings
                            members={group.data.members}
                            key={group.data.members.length}
                            admin={group.data.admin}
                            handleLeaveGroup={handleLeaveGroup}
                        />
                    </div>
                </div>
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

export default Settings
