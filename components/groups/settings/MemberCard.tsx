import Image from 'next/image'

const MemberCard = ({ members, admin }) => {
    return (
        <>
            {members.map((member) => (
                <div
                    key={member.userId.toString()}
                    className={
                        'flex justify-between items-center text-white bg-purple-2 h-12 rounded-standard my-2 px-3'
                    }>
                    <div className='flex items-center'>
                        <div className='h-fit w-fit flex'>
                            <Image
                                src={member.picture}
                                alt=''
                                width={32}
                                height={32}
                                className='rounded-full'
                            />
                        </div>
                        <div className='flex flex-col ml-4'>
                            <div>{member.userName}</div>
                            {member.userId === admin?.userId ? (
                                <div className='italic'>Admin</div>
                            ) : (
                                <div className='italic'>Gruppemedlem</div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MemberCard
