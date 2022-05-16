import FlatButton from 'components/buttons/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SubjectCard = ({
    groupImage,
    groupName,
    subjectCode,
    members,
    totalMembers,
}) => {
    const router = useRouter()
    return (
        <>
            <div
                onClick={() => router.push(`/groups/${groupName}`)}
                className='cursor-pointer flex p-3 input-shadow w-96 items-center bg-white rounded-standard text-dark-1'>
                <Image src={groupImage} width={128} height={128} alt='' />
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
