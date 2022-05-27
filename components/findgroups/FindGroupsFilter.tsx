import DropDown from 'components/general/DropDown'
import TopSearch from 'components/general/TopSearch'

export const FindGroupsFilter = ({ items, setSelectedSchool }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center py-8'>
                <div className='w-40 md:w-80 xl:w-96'>
                    <TopSearch title='Søk etter skole...' />
                </div>
                <div className='w-40 md:w-80 xl:w-96 ml-8'>
                    <DropDown
                        title={'Velg Skole'}
                        items={items}
                        dropDownTitle={'Velg Skole'}
                        setSelectedSchool={setSelectedSchool}
                    />
                </div>
            </div>
            <div className='w-2/3 border-b-2 border-solid border-dark-5'></div>
        </div>
    )
}
