import ProgressBar from 'components/General/ProgressBar'
import React from 'react'

const FindGroupsHeader = ({ stepTitle }) => {
    return (
        <div className='bg-white h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='h-40 flex flex-col justify-between py-6 px-6'>
                    <div>Kollokviegrupper / {stepTitle}</div>
                    <div className='text-2xl'>{stepTitle}</div>
                </div>

                <div className='pr-16'>
                    <ProgressBar/>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
