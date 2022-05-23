import { UserGroupIcon } from '@heroicons/react/outline'
import React from 'react'

export const GroupMembers = ({ members, totalMembers, color }) => {
    return (
        <div className={`py-1 text-${color} flex`}>
            <UserGroupIcon className={'w-6 h-6 px-1 '} />
            <p>
                {members}/{totalMembers}
            </p>
        </div>
    )
}
