import FlatButton from 'components/general/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import { ObjectId } from 'mongodb'
import Image from 'next/image'

interface SubjectCardProps {
    groupName: string
    groupImage: string
    groupId: ObjectId
    subjectCode: string
    members?: number
    totalMembers?: number
    compact: boolean
    onClick?: () => void
    classNames?: string
}

const SubjectCard = ({
    groupImage,
    groupName,
    groupId,
    subjectCode,
    members,
    totalMembers,
    compact,
    onClick,
    classNames,
}: SubjectCardProps) => {
    const imageSize = compact ? 64 : 128
    console.log(groupId)

    return (
        <div
            onClick={onClick}
            className={
                classNames +
                ' group cursor-pointer flex p-3 h-full shadow-md shadow-purple-4 max-w-lg items-center bg-white rounded-standard text-dark-1'
            }>
            <div className='w-max'>
                <Image
                    src={groupImage}
                    width={imageSize}
                    height={imageSize}
                    alt=''
                />
            </div>
            <div className={'px-6 w-3/4'}>
                <div className='p-1 group-hover:text-purple-2'>
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
