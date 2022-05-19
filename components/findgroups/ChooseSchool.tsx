import FlatButton from 'components/buttons/FlatButton'
import React, { useState } from 'react'
import { FindGroupsFilter } from './FindGroupsFilter'
import FindGroupsPopularSchools from './FindGroupsPopularSchools'

const ChooseSchool = () => {
    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedGrade, setSelectedGrade] = useState('')

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
        <div className='bg-white input-shadow h-full min-w-min max-w-7xl w-full my-16'>
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
                        <FindGroupsPopularSchools schoolName={school.value} />
                    </div>
                ))}

                <div className='p-16'>
                    <FlatButton>Gå videre</FlatButton>
                </div>
            </div>
        </div>
    )
}

export default ChooseSchool
