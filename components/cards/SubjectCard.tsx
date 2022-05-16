import FlatButton from 'components/buttons/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface SubjectCardProps {
    groupName: string
    groupImage: string
    subjectCode: string
    members?: number
    totalMembers?: number
    compact: boolean
}

const SubjectCard = ({
    groupImage,
    groupName,
    subjectCode,
    members,
    totalMembers,
    compact,
}: SubjectCardProps) => {
    const router = useRouter()
    const imageSize = compact ? 64 : 128

    return (
        <div
            onClick={() => router.push(`/groups/${groupName}`)}
            className='cursor-pointer flex p-3 input-shadow max-w-sm items-center bg-white rounded-standard text-dark-1'>
            <Image
                src={groupImage}
                width={imageSize}
                height={imageSize}
                alt=''
            />
            <div className={'px-6'}>
                <div className='p-1'>
                    <div className={'text-lg font-semibold'}>{groupName}</div>
                    <div className='text-sm'>{subjectCode}</div>
                </div>
                {!compact ? (
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
                ) : null}
            </div>
        </div>
    )
}

export default SubjectCard
