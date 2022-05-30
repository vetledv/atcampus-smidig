import { FindGroupsFilter } from './FindGroupsFilter'
import { SchoolMap } from './SchoolMap'

interface State {
    step: Number
    stepTitle: String
}

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
                    <div className='ml-20 md:ml-7 font-semibold text-xl text-dark-1 p-4'>
                        Populære institusjoner
                    </div>
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
