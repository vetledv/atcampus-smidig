import React from 'react'
import { CogIcon } from '@heroicons/react/solid'
import FlatButton from 'components/buttons/Button'
import { GroupMembers } from 'components/general/Lib'

const GroupHeaderMobile = () => {
    return (
        <>
            <div className={'h-48 w-96 bg-dark-1 text-white'}>
                <div className='flex justify-between items-center h-full'>
                    <div className='flex flex-col justify-between'>
                        <div className=''>GroupName</div>
                        <FlatButton
                            children={'Følger Gruppe'}
                            className={'bg-slate-100 text-purple-1'}
                        />
                        <div>Medlemmer Aktive: </div>
                        <GroupMembers
                            members={3}
                            totalMembers={12}
                            color={'white'}
                        />
                    </div>
                    <div>
                        <CogIcon className={'w-9 h-9 text-purple-1'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupHeaderMobile
