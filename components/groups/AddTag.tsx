import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

const AddTag = () => {
    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-4 '>
            {/*Container*/}
            <div className='flex flex-col bg-white rounded-2xl py-8 px-8 w-[333px] h-[500px] drop-shadow'>
                {/*Header container*/}
                <div className='flex text-left pb-5'>
                    <h1 className='text-2xl text-dark-1 font-bold'>Tags</h1>
                </div>
                {/*Sub txt*/}
                <div className='h-full '>
                    <h1 className='text-sm text-dark-1 font-semibold pl-2'>
                        Tags
                    </h1>
                    {/*Search*/}
                    <div className='flex my-4 border-2 rounded-lg border-dark-5 focus-within:border-gradient-left bg-white drop-shadow-sm'>
                        <div className='flex px-2 items-center'>
                            <SearchIcon className='w-4 h-4 text-dark-3' />
                        </div>
                        {/*Search input*/}
                        <div>
                            <input
                                type='text'
                                name='tag-search'
                                placeholder='Søk'
                                required
                                className='p-2 text-dark-5 text-sm rounded font-form text-left bg-white-200 w-full outline-none'
                            />
                        </div>
                    </div>
                    {/*Selected tags container*/}
                    <div className=' h-[270px] '>
                        <h1 className='text-sm  pb-4 text-dark-1 font-semibold pl-2 '>
                            Dine tags:
                        </h1>
                        {/*Selected tags grid*/}
                        <div className='h-max  text-dark-4 grid grid-cols-2   '>
                            {/*tag*/}
                            <div className='flex items-center w-full border-2 border-dark-5 rounded-md justify-center mr-1 my-2 text-center  '>
                                <h1 className='text-sm  font-semibold px-1 '>
                                    Programmering
                                </h1>
                            </div>
                            {/*tag*/}
                            <div className='flex items-center w-full border-2 border-dark-5 rounded-md justify-center ml-1 my-2 text-center  '>
                                <h1 className='text-sm  font-semibold px-1 '>
                                    Bestå Eksamen
                                </h1>
                            </div>
                            {/*tag*/}
                            <div className='flex items-center w-full border-2 border-dark-5 rounded-md justify-center mr-1 my-2 text-center  '>
                                <h1 className='text-sm  font-semibold px-1 '>
                                    5. Sem
                                </h1>
                            </div>
                            {/*tag*/}
                            <div className='flex items-center w-full border-2 border-dark-5 rounded-md justify-center ml-1 my-2  '>
                                <h1 className='text-sm  font-semibold px-1 '>
                                    5. Sem
                                </h1>
                            </div>
                        </div>
                        <div className=' my-5 h-[1px] w-full bg-dark-5'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTag
