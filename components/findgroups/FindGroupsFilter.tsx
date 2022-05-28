import DropDown from 'components/general/DropDown'
import TopSearch from 'components/general/TopSearch'

export const FindGroupsFilter = ({
    items,
    setSelectedSchool,
    selectedSchool,
}) => {
    return (
        <div className='flex justify-around items-start py-8'>
            <div className='hidden md:block md:w-80 xl:w-96 mr-4'>
                <TopSearch title='Søk etter skole...' />
            </div>
            <div className='w-40 md:w-80 xl:w-96 ml-4 xs:mr-32 mr-0'>
                <DropDown
                    title={selectedSchool}
                    items={items}
                    dropDownTitle={
                        selectedSchool ? selectedSchool : 'Velg institusjon'
                    }
                    setSelectedSchool={setSelectedSchool}
                />
            </div>
        </div>
    )
}
