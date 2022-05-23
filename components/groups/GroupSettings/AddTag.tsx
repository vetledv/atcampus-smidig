import TopSearch from 'components/general/TopSearch'
import React from 'react'
import GroupTags from './GroupTags'

const AddTag = ({ tags }) => {
    return (
        <div className='flex flex-col bg-white rounded-standard p-6 drop-shadow gap-4 w-80 h-96'>
            {/*Header container*/}
            <h1 className='text-2xl text-dark-1 font-bold'>Tags</h1>
            {/*Sub txt*/}
            <div className='flex flex-col gap-4 pb-4 border-b-2 '>
                <div className='hover:drop-shadow-sm'>
                    <h1 className='text-sm text-dark-1 font-semibold pl-2'>
                        Tags
                    </h1>
                    {/*Search*/}
                    <TopSearch title={'Søk i tags'} />
                </div>
                {/*Selected tags container*/}
                <h1 className='text-sm text-dark-1 font-semibold pl-2'>
                    Dine tags:
                </h1>
                {/*Selected tags grid*/}
                <GroupTags tags={tags} />
            </div>
        </div>
    )
}

export default AddTag
