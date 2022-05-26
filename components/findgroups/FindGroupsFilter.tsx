import DropDown from 'components/general/DropDown'
import TopSearch from 'components/general/TopSearch'

export const FindGroupsFilter = ({ items }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center py-8'>
                <div className='w-40 md:w-80 lg:w-96 hover:input-shadow'>
                    <TopSearch title='Søk etter skole...' />
                </div>
                <div className='w-40 md:w-80 lg:w-96 ml-8 hover:input-shadow'>
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
