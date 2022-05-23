import AddTag from 'components/groups/groupSettings/AddTag'
import EditTagCard from 'components/groups/groupSettings/EditGroupCard'
import MembersSettings from 'components/groups/groupSettings/MembersSettings'
import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useGroup } from 'hooks/useGroups'

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
                <div className='flex flex-row justify-start bg-dark-6 py-8'>
                    <div className='px-8'>
                        <EditTagCard
                            groupName={group.data.groupName}
                            groupDescription={group.data.description}
                            groupMaxMembers={group.data.maxMembers}
                        />
                    </div>
                    <div className='px-8'>
                        <AddTag tags={group.data.tags} />
                    </div>
                    <div className='px-8'>
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
