import { FindGroupsFilter } from './FindGroupsFilter'
import { SchoolMap } from './SchoolMap'

const schools = [
    {
        id: 1,
        value: 'Høyskolen Kristiania',
    },
    {
        id: 2,
        value: 'Oslo Met',
    },
    {
        id: 3,
        value: 'Handelshøyskolen BI',
    },
]

const ChooseSchool = ({ setSelectedSchool, selectedSchool }) => {
    return (
        <>
            <div className='mr-32 xs:mr-0 pb-4'>
                <FindGroupsFilter
                    setSelectedSchool={setSelectedSchool}
                    selectedSchool={selectedSchool}
                    items={schools}
                />
            </div>
            <div className='font-semibold text-xl text-dark-1 p-4 whitespace-nowrap'>
                Populære institusjoner
            </div>
            <div className='flex flex-col items-center'>
                <div className='w-full'>
                    <SchoolMap
                        setSelectedSchool={setSelectedSchool}
                        selectedSchool={selectedSchool}
                    />
                </div>
            </div>
        </>
    )
}

export default ChooseSchool
