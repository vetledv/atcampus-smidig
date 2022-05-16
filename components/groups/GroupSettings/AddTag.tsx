import TopSearch from 'components/general/TopSearch'
import React from 'react'

const AddTag = () => {
    const tags = [
        {
            id: 1,
            value: 'Programmering',
        },
        {
            id: 2,
            value: '5.Sem',
        },
        {
            id: 3,
            value: 'Bestå Eksamen',
        },
    ]
    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-4 '>
            {/*Container*/}
            <div className='flex flex-col bg-white rounded-standard py-8 px-8 w-[333px] h-[500px] drop-shadow'>
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
                    <div className='py-3'>
                        <TopSearch title={'Søk i tags'} />
                    </div>

                    {/*Selected tags container*/}
                    <div className=' h-[270px] '>
                        <h1 className='text-sm  pb-4 text-dark-1 font-semibold pl-2 '>
                            Dine tags:
                        </h1>
                        {/*Selected tags grid*/}
                        <div className='h-max  text-dark-4 grid grid-cols-2   '>
                            {/*tag*/}
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className='flex items-center w-full border-2 border-dark-5 rounded-standard justify-center mr-1 my-2 text-center  '>
                                    <h1 className='text-sm  font-semibold px-1 '>
                                        {tag.value}
                                    </h1>
                                </div>
                            ))}
                        </div>
                        <div className=' my-5 h-[1px] w-full bg-dark-5'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTag
