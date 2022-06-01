import { Member } from '@/types/groups'
import Image from 'next/image'

const MemberItem = ({
    member,
    adminId,
}: {
    member: Member
    adminId: string
}) => {
    return (
        <div className='flex gap-2 border-b border-purple-4 w-full px-2 py-4'>
            <Image
                src={member?.picture}
                alt=''
                width={48}
                height={48}
                className='rounded-full'
            />
            <div className='flex flex-col  '>
                <div className='font-semibold'>{member.userName}</div>
                {member.userId === adminId ? (
                    <div className='italic'>Admin</div>
                ) : (
                    <div className='italic'>Gruppemedlem</div>
                )}
            </div>
        </div>
    )
}

export default MemberItem
