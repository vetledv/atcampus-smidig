import React from 'react'

const FindGroupsHeader = () => {
    return (
        <div className='bg-white h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='h-40 flex flex-col justify-between py-6 px-6'>
                    <div>Kollokviegrupper / Velg Skole(temporary)</div>
                    <div className='text-2xl'>Velg Skole(temporary)</div>
                </div>

                <div className='pr-16'>Progressbar</div>
                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
