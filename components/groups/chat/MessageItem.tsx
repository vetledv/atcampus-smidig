import React from 'react'
import { Member, Message } from 'types/groups'
import Image from 'next/image'

const MessageItem = ({
    message,
    groupMembers,
}: {
    message: Message
    groupMembers: Member[]
}) => {
    return (
        <div className='flex pt-4 rounded gap-2'>
            <div className='flex w-full px-2 py-0.5 hover:bg-gray-100'>
                <div className='w-14'>
                    {groupMembers.find(
                        (member) => member.userId === message.from.userId
                    )?.picture ? (
                        <div className='border-2 rounded-full w-12 h-12'>
                            <Image
                                src={
                                    groupMembers.find(
                                        (member) =>
                                            member.userId ===
                                            message.from.userId
                                    )?.picture
                                }
                                alt=''
                                width={48}
                                height={48}
                                className='rounded-full'
                            />
                        </div>
                    ) : (
                        <div className='h-12 w-12 rounded-full border-2 bg-white items-center flex justify-center font-semibold'>
                            {message.from.userName.charAt(0)}
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-10/12'>
                    <div className='flex flex-row gap-2 items-baseline'>
                        {groupMembers.filter(
                            (m) => m.userId === message.from.userId
                        ).length > 0 ? (
                            <div className='font-semibold'>
                                {
                                    groupMembers.filter(
                                        (m) => m.userId === message.from.userId
                                    )[0].userName
                                }
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <div className=' text-dark-3 flex gap-2 font-semibold'>
                                    {message.from.userName}
                                </div>
                                <div className='italic text-sm text-dark-3 mt-auto'>
                                    Left
                                </div>
                            </div>
                        )}
                        <div className='italic text-dark-4 flex flex-grow '>
                            {new Date(message.timestamp).toLocaleTimeString(
                                'no-NO',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }
                            )}
                        </div>
                    </div>
                    <div className='text-dark-1 text-md break-words'>
                        {message.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageItem
