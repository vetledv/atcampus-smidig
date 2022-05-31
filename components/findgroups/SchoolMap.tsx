import { ObjectId } from 'mongodb'
import { Key } from 'react'
import FindGroupsPopularSchools from './FindGroupsPopularSchools'

export const SchoolMap = ({ setSelectedSchool, selectedSchool }) => {
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
        <div>
            {schools.map((school: { id: Key | ObjectId; value: any }) => (
                <div
                    className='flex justify-center'
                    key={school.id.toString()}
                    onClick={() => {
                        setSelectedSchool(school.value)
                    }}>
                    <FindGroupsPopularSchools
                        schoolName={school.value}
                        selectedSchool={selectedSchool}
                    />
                </div>
            ))}
        </div>
    )
}
