import FlatButton from 'components/general/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import { ObjectId } from 'mongodb'
import Image from 'next/image'

interface SubjectCardProps {
    groupName: string
    groupImage?: string
    groupId: ObjectId
    subjectCode: string
    members?: number
    totalMembers?: number
    compact: boolean
    onClick?: () => void
    onMouseEnter?: () => void
    classNames?: string
    children?: React.ReactNode
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
    onMouseEnter,
    classNames,
    children,
}: SubjectCardProps) => {
    const imageSize = compact ? 64 : 128
    const image =
        groupImage ||
        'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={
                classNames +
                ' group cursor-pointer flex p-3 h-full shadow-md shadow-purple-4 max-w-lg items-center bg-white rounded-standard text-dark-1'
            }>
            <div className='w-max'>
                <Image
                    src={image}
                    width={imageSize}
                    height={imageSize}
                    alt=''
                />
            </div>
            <div className={'px-6 w-3/4'}>
                <div className='flex flex-col gap-1 p-1 group-hover:text-purple-2'>
                    <div className={'text-lg font-semibold'}>{groupName}</div>
                    <div className='text-sm px-2 py-1 rounded-md w-fit bg-purple-5'>
                        {subjectCode}
                    </div>
                </div>
                {!compact ? (
                    <div className='py-1'>
                        <GroupMembers
                            members={members || 0}
                            totalMembers={totalMembers || 0}
                            color={'dark-1'}
                        />
                        {children}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default SubjectCard
