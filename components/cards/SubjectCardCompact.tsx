import React from 'react'
import Link from 'next/link'

const SubjectCardCompact = ({
    groupImage,
    groupName,
    subjectCode,
    groupId,
}) => {
    return (
        <>
            {' '}
            <Link href={`/${groupId}`}>
                <div className='flex p-3 input-shadow w-96 items-center bg-white rounded-standard'>
                    <img src={groupImage} className={'w-16 h-16'} />
                    <div className={'px-6'}>
                        <div className='p-1'>
                            <div className={'text-lg font-semibold'}>
                                {groupName}
                            </div>
                            <div className={'text-sm'}>{subjectCode}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default SubjectCardCompact
