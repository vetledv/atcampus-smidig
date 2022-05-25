import React from 'react'
import TopSearch from 'components/general/TopSearch'
import FlatButton from 'components/buttons/FlatButton'

const Header = () => {
    return (
        <div className='flex lg:top-0 lg:left-72 lg:right-0 justify-center bg-purple-5 pr-8 py-6 lg:sticky '>
            <div className={'flex w-9/12 items-center bg-red-400'}>
                <div className='w-full lg:px-6 lg:align lg:w-3/5 xl:w-9/12'>
                    <TopSearch title={'Søk'} />
                </div>
                <div className='hidden lg:block lg:px-6 lg:w-2/5 xl:w-3/12'>
                    <FlatButton>Still Spørsmål</FlatButton>
                </div>
            </div>
        </div>
    )
}

export default Header
