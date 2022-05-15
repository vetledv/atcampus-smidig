import FlatButton from 'components/buttons/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import React from 'react'
import Image from 'next/image'

const SubjectCard = ({
    groupImage,
    groupName,
    subjectCode,
    members,
    totalMembers,
}) => {
    return (
        <>
            <div className='flex p-3 input-shadow w-96 items-center cursor-default bg-white rounded-standard text-dark-1'>
                <Image src={groupImage} className={'w-32 h-32'} alt='' />
                <div className={'px-6'}>
                    <div className='p-1'>
                        <div className={'text-lg font-semibold'}>
                            {groupName}
                        </div>
                        <div className='text-sm'>{subjectCode}</div>
                    </div>
                    <div className='py-1'>
                        <GroupMembers
                            members={members}
                            totalMembers={totalMembers}
                            color={'dark-1'}
                        />
                        <div className={'py-1'}>
                            <FlatButton>Join Group</FlatButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubjectCard
