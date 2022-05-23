import AddTag from 'components/groups/groupSettings/AddTag'
import EditTagCard from 'components/groups/groupSettings/EditGroupCard'
import MembersSettings from 'components/groups/groupSettings/MembersSettings'
import React from 'react'

const Settings = () => {
    return (
        <>
            <div className='flex flex-row justify-start bg-dark-6 py-8'>
                <div className='px-8'>
                    <EditTagCard />
                </div>
                <div className='px-8'>
                    <AddTag />
                </div>
                <div className='px-8'>
                    <MembersSettings
                        memberName={'Magnus Soleim'}
                        memberType={'Admin'}
                    />
                </div>
            </div>
        </>
    )
}

export default Settings
