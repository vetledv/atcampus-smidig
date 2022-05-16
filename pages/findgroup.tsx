import FlatButton from 'components/buttons/FlatButton'
import { FindGroupsFilter } from 'components/findgroups/FindGroupsFilter'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import FindGroupsPopularSchools from 'components/findgroups/FindGroupsPopularSchools'
import React, { useState } from 'react'
// Contents of this file will be moved. This page will serve the find group functionality.
// TODO: add steps to create a group

const FindGroupPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedGrade, setSelectedGrade] = useState('')
    console.log('selectedSchool', selectedSchool)

    const [step, setStep] = useState(0)

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
            <div className='bg-dark-6 w-full'>
                <FindGroupsHeader />
                <div className='flex justify-center'>
                    <div className='bg-white input-shadow h-full min-w-min max-w-7xl w-full my-16'>
                        <FindGroupsFilter items={schools} />
                        <div>
                            <div className='font-semibold text-xl text-dark-1 p-4'>
                                Populære institusjoner
                            </div>
                            {schools.map((school) => (
                                <div
                                    key={school.id}
                                    onClick={() =>
                                        setSelectedSchool(school.value)
                                    }>
                                    <FindGroupsPopularSchools />
                                </div>
                            ))}

                            <div className='p-16'>
                                <FlatButton>Gå videre</FlatButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindGroupPage
