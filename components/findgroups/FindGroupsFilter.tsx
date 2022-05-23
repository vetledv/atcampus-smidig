import DropDown from 'components/General/DropDown'
import React from 'react'

export const FindGroupsFilter = ({ items }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center py-8'>
                <div className='w-96'>
                    <DropDown
                        title={'Velg Skole'}
                        items={items}
                        dropDownTitle={'Velg Skole'}
                    />{' '}
                    {/*Endres til søkefelt*/}
                </div>
                <div className='w-96'>
                    <DropDown
                        title={'Velg Skole'}
                        items={items}
                        dropDownTitle={'Velg Skole'}
                    />
                </div>
            </div>
            <div className='w-2/3 border-b-2 border-solid border-dark-5'></div>
        </div>
    )
}
