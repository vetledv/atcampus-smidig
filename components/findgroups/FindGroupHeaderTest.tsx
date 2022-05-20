import React from 'react'
import ProgressBar from 'components/General/ProgressBar'

const FindGroupsHeaderTest = ({ title }) => {
    return (
        <div className='bg-white input-shadow text-dark-1'>
            <div className='flex '>
                <div className=' flex flex-col justify-between px-6'>
                    <div>
                        Kollokviegrupper / Velg Skole / Velg Fag(temporary)
                    </div>
                    <div className='text-2xl'>{title}(temporary)</div>
                </div>

                <div className='w-6/12'>
                    <ProgressBar />
                </div>
            </div>
        </div>
    )
}

export default FindGroupsHeaderTest
