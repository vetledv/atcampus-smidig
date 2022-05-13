import FlatButton from 'components/buttons/FlatButton'
import React from 'react'
import { UserGroupIcon } from '@heroicons/react/outline'

const SubjectCard = ({
    groupImage,
    groupName,
    subjectCode,
    members,
    totalMembers,
}) => {
    return (
        <>
            <div className='flex p-3 input-shadow w-96 items-center cursor-default'>
                <img src={groupImage} className={'w-32 h-32'} />
                <div className={'px-6'}>
                    <div className='p-1'>
                        <div className={'text-lg font-semibold'}>
                            {groupName}
                        </div>
                        <div className='text-sm'>{subjectCode}</div>
                    </div>
                    <div className='py-1'>
                        <div className={'py-1 flex'}>
                            <UserGroupIcon className={'w-6 h-6 px-1'} />
                            <p>
                                {members}/{totalMembers}
                            </p>
                        </div>
                        <div className={'py-1'}>
                            <FlatButton children={'Join Group'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubjectCard
