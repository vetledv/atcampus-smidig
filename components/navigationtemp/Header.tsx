import React from 'react'
import TopSearch from 'components/generaltemp/TopSearch'
import FlatButton from 'components/buttons/FlatButton'

const Header = () => {
    return (
        <>
            <div className='flex justify-center'>
                <div className={'flex w-9/12 items-center'}>
                    <div className='w-full lg:px-6 lg:align lg:w-3/5 xl:w-9/12'>
                        <TopSearch title={'Søk'} />
                    </div>
                    <div className='hidden lg:block lg:px-6 lg:w-2/5 xl:w-3/12'>
                        <FlatButton>Still Spørsmål</FlatButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
