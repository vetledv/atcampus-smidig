import React from 'react'
import { CogIcon } from '@heroicons/react/solid'
import FlatButton from 'components/buttons/Button'
import { GroupMembers } from 'components/general/Lib'
import Link from 'next/link'

const GroupHeaderMobile = ({ groupName, activeMembers }) => {
    return (
        <>
            <div className={'h-48 w-96 bg-dark-1 text-white'}>
                <div className='flex justify-between h-full'>
                    <div className='flex flex-col justify-evenly px-6'>
                        <div className='pb-3'>
                            <div className={'text-2xl font-bold pb-3'}>
                                {groupName}
                            </div>
                            <FlatButton
                                className={
                                    'bg-slate-100 text-purple-1 hover:bg-purple-1 hover:text-white '
                                }>
                                Følger Gruppe
                            </FlatButton>
                        </div>
                        <div className=''>
                            <div className='flex flex-row items-center'>
                                <div>Medlemmer Aktive: {activeMembers} </div>{' '}
                                <div className='text-xs'>🟢</div>
                            </div>
                            <GroupMembers
                                members={3}
                                totalMembers={12}
                                color={'white'}
                            />
                        </div>
                    </div>
                    <div>
                        <Link href={'/group/settings'}>
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

export default GroupHeaderMobile
