import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
const TwoOptionsButtons = () => {
    return (
        <div className='flex  bg-white p-3 w-[300px] h-[80px] hover:font-semibold font-medium border-2 hover:border-dark-4 border-dark-5 rounded-md text-center items-center justify-center drop-shadow-md'>
            {/*onClick={'/findgroup'}*/}
            <div className=' items-center text-center justify-center '>
                <PlusCircleIcon className='text-dark-3 w-8 text-center items-center justify-center ' />
                <h1 className='text-3xl text-dark-3  text-center '>
                    Finn ny gruppe
                </h1>
            </div>
        </div>
    )
}

export default TwoOptionsButtons
