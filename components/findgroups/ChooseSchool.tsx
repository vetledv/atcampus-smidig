import { useState } from 'react'
import { FindGroupsFilter } from './FindGroupsFilter'
import FindGroupsPopularSchools from './FindGroupsPopularSchools'

interface State {
    step: Number
    stepTitle: String
}

const ChooseSchool = ({ school }) => {
    const [selectedSchool, setSelectedSchool] = useState('')

    school = selectedSchool
    console.log('selectedSchool', selectedSchool)

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
    return (
        <>
            <div className='h-96'>
                <FindGroupsFilter items={schools} />
                <div>
                    <div className='font-semibold text-xl text-dark-1 p-4'>
                        Populære institusjoner
                    </div>
                    {schools.map((school) => (
                        <div
                            key={school.id}
                            onClick={() => {
                                setSelectedSchool(school.value)
                            }}>
                            <FindGroupsPopularSchools
                                schoolName={school.value}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChooseSchool
