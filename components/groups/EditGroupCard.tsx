import GradientButton from 'components/buttons/GradientButton'
import React from 'react'

const EditTagCard = () => {
    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-2 '>
            <div className='flex flex-col bg-white rounded-xl py-2 px-8 w-[340px] h-[370px] drop-shadow '>
                <div className='  my-2 items-start'>
                    <h1 className='text-center text-md text-dark-1 font-semibold pb-2 '>
                        Gruppeinstillinger
                    </h1>
                    <div className=' mt-1'>
                        <h1 className='text-sm text-dark-1'>Gruppenavn</h1>
                    </div>
                    <div className=''>
                        <input
                            type='text'
                            name='group-name'
                            required
                            className='p-2 text-dark-3 text-sm rounded border-2 rounded-lg font-form text-left bg-white-200 w-full outline-none'
                        />
                    </div>
                    <div className=' mt-2'>
                        <h1 className='text-sm text-dark-1'>Beskrivelse</h1>
                    </div>
                    <div className=''>
                        <input
                            type='text'
                            name='group-name'
                            required
                            className='p-2 text-dark-3 text-sm rounded border-2 rounded-lg font-form text-left bg-white-200 w-full outline-none'
                        />
                    </div>
                    <div className=' mt-2'>
                        <h1 className='text-sm text-dark-1'>
                            Totalt antall medlemmer
                        </h1>
                    </div>
                    <div className=' '>
                        <input
                            type='text'
                            name='group-name'
                            required
                            className='p-2 text-dark-3 text-sm rounded border-2 rounded-lg font-form text-left bg-white-200 w-[50px] h-[35px] outline-none'
                        />
                    </div>
                </div>
                <div className='my-2 items-center justify-center space-y-2 align-center grid grid-cols-1 w-[240px]'>
                    <GradientButton>Oppdater</GradientButton>
                    <GradientButton>Slett</GradientButton>
                </div>
            </div>
        </div>
    )
}

export default EditTagCard
