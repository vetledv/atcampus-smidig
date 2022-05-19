import React from 'react'
import Image from 'next/image'
import { XIcon } from '@heroicons/react/outline'
import FlatButton from 'components/buttons/FlatButton'

const GroupMembers = () => {
    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-2 '>
            <div className='flex flex-col bg-white rounded-xl py-2 px-8 w-[340px] h-[370px] drop-shadow'>
                <div className='my-2 items-start '>
                    <h1 className='text-center text-md text-dark-1 font-semibold pb-2 '>
                        Medlemmer
                    </h1>
                    <div className='flex flex-col gap-2 pt-4 '>
                        <div className='flex flex-row gap-4 bg-purple-2 p-2 rounded'>
                            <Image
                                src={'/profilepic.png'}
                                alt={'placeholder pfp'}
                                width={24}
                                height={12}></Image>
                            <p className='text-top justify-start text-sm  text-dark-6'>
                                Johannes Jonsen
                            </p>
                            <p className=' text-xs text-dark-6 justify-end text-end pl-3'>
                                Administrator
                            </p>
                        </div>
                        <div className='flex flex-row gap-4 bg-purple-2 p-2 rounded'>
                            <Image
                                src={'/profilepic.png'}
                                alt={'placeholder pfp'}
                                width={24}
                                height={12}></Image>
                            <p className='text-top justify-start text-sm  text-dark-6'>
                                Marcus Larsen
                            </p>
                            <p className=' text-xs text-dark-6 justify-end text-end pl-3'>
                                Medlem
                            </p>
                            <XIcon className='text-dark-6 text-xs h-[20px] hover:text-red-500 justify-end items-end pl-3 right-0' />
                        </div>
                    </div>
                </div>
                <div className=' text-dark-4 flex flex-wrap max-w-xs min-w-min items-center justify-center py-2 mt-12'>
                    <div className='flex w-full px-1 border border-dark-5 rounded-standard mr-1 my-1 mb-6'></div>
                    <FlatButton>Forlat Gruppe</FlatButton>
                </div>
            </div>
        </div>
    )
}

export default GroupMembers
