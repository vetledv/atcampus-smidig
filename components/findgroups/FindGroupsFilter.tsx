import DropDown from 'components/general/DropDown'
import TopSearch from 'components/general/TopSearch'

export const FindGroupsFilter = ({
    items,
    setSelectedSchool,
    selectedSchool,
}) => {
    return (
        <div className='grid grid-cols-2'>
            <div className='mr-2 hidden xl:block'>
                <TopSearch title='Søk etter skole...' />
            </div>
            <div className='xl:ml-2 mb-4 xl:mb-0'>
                <DropDown
                    items={items}
                    setSelectedSchool={setSelectedSchool}
                    dropDownTitle={selectedSchool}
                />
            </div>
        </div>
    )
}
