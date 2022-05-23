import { CogIcon } from '@heroicons/react/solid'
import FlatButton from 'components/buttons/Button'
import { GroupMembers } from 'components/generaltemp/Lib'
import Link from 'next/link'
import { Group } from 'types/groups'

const GroupHeader = ({
    group,
    activeMembers,
}: {
    group: Group | null
    activeMembers: number
}) => {
    // for testing
    const membersAmount = group?.members?.length ?? 0
    const maxMembers = group?.maxMembers ?? 12
    const groupName = group?.groupName ?? 'Group Name'

    return (
        <>
            <div className={'h-48 min-w-96 bg-dark-1 text-white'}>
                <div className='flex justify-between h-full'>
                    <div className='flex flex-col justify-evenly px-6'>
                        <div className='pb-3'>
                            <div className={'text-2xl font-bold pb-3'}>
                                {groupName}
                            </div>
                            <FlatButton
                                className={
                                    'bg-slate-100 text-purple-1 hover:bg-purple-1 hover:text-white cursor-default'
                                }>
                                Følger Gruppe
                            </FlatButton>
                        </div>
                        <div className=''>
                            <div className='flex flex-row items-center'>
                                <div>Medlemmer Aktive: {activeMembers} </div>{' '}
                                {activeMembers > 0 && (
                                    <div className='text-xs'>🟢</div>
                                )}
                            </div>
                            <GroupMembers
                                members={membersAmount}
                                totalMembers={maxMembers}
                                color={'white'}
                            />
                        </div>
                    </div>
                    <div>
                        <Link href={`/groups/${group._id}/settings`}>
                            <CogIcon
                                className={
                                    'w-9 h-9 text-purple-1 m-3 cursor-pointer'
                                }
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupHeader
