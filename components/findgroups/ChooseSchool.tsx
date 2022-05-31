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
            <div className='flex flex-col items-center'>
                <div className='mr-32 xs:mr-0'>
                    <FindGroupsFilter
                        setSelectedSchool={setSelectedSchool}
                        selectedSchool={selectedSchool}
                        items={schools}
                    />
                </div>
                <div>
                    <div className='ml-20 md:ml-7 lg:ml-48 font-semibold text-xl text-dark-1 p-4'>
                        Populære institusjoner
                    </div>
                    <div className='sm:w-screen'>
                        <SchoolMap
                            setSelectedSchool={setSelectedSchool}
                            selectedSchool={selectedSchool}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseSchool
