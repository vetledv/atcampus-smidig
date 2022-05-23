import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useGroup } from 'hooks/useGroups'
import EditTagCard from 'components/groups/movedTempCauseErrors/EditGroupCard'
import AddTag from 'components/groups/movedTempCauseErrors/AddTag'
import MembersSettings from 'components/groups/groupsettings/MembersSettings'

const Settings = () => {
    const router = useRouter()
    const routerQuery = router.query
    const session = useSession()

    const group = useGroup(routerQuery.group as string)

    if (group.isLoading) {
        return <div>Loading...</div>
    }
    if (group.isError) {
        return <div>Error: {group.error.message}</div>
    }

    return (
        <>
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
                        <AddTag tags={group.data.tags} />
                    </div>
                    <div className='px-8 md:mt-8 sm:mt-8'>
                        <MembersSettings
                            members={group.data.members}
                            key={group.data.members.length}
                            admin={group.data.admin}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Settings
