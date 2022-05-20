import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
const TwoOptionsButtons = () => {
    return (
        <div className='flex justify-center bg-white p-3 w-[300px] h-[80px] border-dark-5 rounded-md'>
            {/*onClick={'/findgroup'}*/}
            <div className=' items-center text-center justify-center '>
                <PlusCircleIcon className='text-dark-3 w-8 ml-8 ' />
                <h1 className='text-3xl text-dark-3  text-center '>
                    Finn ny gruppe
                </h1>
            </div>
        </div>
    )
}

export default TwoOptionsButtons
