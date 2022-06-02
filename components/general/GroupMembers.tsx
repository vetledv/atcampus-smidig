import { UserGroupIcon } from '@heroicons/react/outline'

export const GroupMembers = ({
    members,
    totalMembers,
    color,
}: {
    members: number
    totalMembers: number
    color: string
}) => {
    return (
        <div className={`py-1 text-${color} flex`}>
            <UserGroupIcon className={'w-6 h-6 px-1 '} />
            <p>
                {members}/{totalMembers}
            </p>
        </div>
    )
}
