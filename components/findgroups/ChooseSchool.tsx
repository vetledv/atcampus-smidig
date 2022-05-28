import { ObjectId } from 'mongodb'
import { SchoolMap } from './SchoolMap'
import { Key, useState } from 'react'
import { FindGroupsFilter } from './FindGroupsFilter'
import FindGroupsPopularSchools from './FindGroupsPopularSchools'

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
            <div className=''>
                <FindGroupsFilter
                    setSelectedSchool={setSelectedSchool}
                    items={schools}
                />
                <div>
                    <div className='ml-7 font-semibold text-xl text-dark-1 p-4'>
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
