import React from 'react'
import { ChatIcon, CalendarIcon } from '@heroicons/react/outline'
import Image from 'next/image'

const GroupMain = () => {
    return (
        <div className='bg-white h-[400px] w-[800px] rounded-lg p-6 '>
            <div className='grid grid-cols-2 w-full h-1/3 '>
                <div className='flex flex-col pt-3 bg-gradient-left p-1/2 mb-3 mr-3 rounded-md '>
                    <ChatIcon className=' text-dark-6 text-xl h-12 text-center' />
                    <h1 className=' text-dark-6 font-regular text-xl text-center hover:font-medium '>
                        Chat
                    </h1>
                </div>
                <div className='flex flex-col pt-3 bg-gradient-left p-1/2 mb-3 mr-3 rounded-md '>
                    <CalendarIcon className=' text-dark-6 text-xl h-12 text-center' />
                    <h1 className=' text-dark-6 font-regular text-xl text-center  hover:font-medium'>
                        Kalender
                    </h1>
                </div>
            </div>
            <div className='grid grid-cols-1 w-full h-2/3'>
                <div className='bg-gradient-left mt-3 rounded-md pt-3 '>
                    <h1 className=' text-dark-6 font-regular text-xl text-center hover:font-medium'>
                        Siste Hendelser
                    </h1>
                    <div className='flex flex-row w-full h-2/3 mt-3'>
                        <div className=' w-1/2 h-full ml-6 mr-3 space-y-1'>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Ole Olsen
                                    </span>{' '}
                                    oppdaterte innstillinger
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    10:54, 09.12.2021
                                </p>
                            </div>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Emma Larsen
                                    </span>{' '}
                                    oppdaterte gruppenavn
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    22:33, 04.12.2021
                                </p>
                            </div>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Magnus Bogstad
                                    </span>{' '}
                                    oppdaterte gruppebilde
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    11:22, 01.12.2021
                                </p>
                            </div>
                        </div>
                        <div className='w-1/2 h-full ml-6 mr-3 space-y-1 '>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Kine Ostebrix
                                    </span>{' '}
                                    oppdaterte beskrivelse
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    13:37, 28.11.2021
                                </p>
                            </div>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Lars Løken
                                    </span>{' '}
                                    oppdaterte gruppenavn
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    09:11, 27.11.2021
                                </p>
                            </div>
                            <div className='bg-dark-6 w-full h-1/3 rounded-sm grid grid-rows-2 items-top p-1'>
                                <p className='text-dark-1 text-center -mt-1'>
                                    <span className='font-medium text-md hover:font-semibold'>
                                        Deus Neetz
                                    </span>{' '}
                                    lagde gruppen
                                </p>
                                <p className='text-right text-xs text-dark-3'>
                                    09:03, 27.11.2021
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupMain
