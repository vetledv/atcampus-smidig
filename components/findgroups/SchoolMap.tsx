import { ObjectId } from 'mongodb'
import { Key, useState } from 'react'
import FindGroupsPopularSchools from './FindGroupsPopularSchools'

export const SchoolMap = ({ setSelectedSchool }) => {
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
            {schools.map((school: { id: Key | ObjectId; value: any }) => (
                <div
                    key={school.id.toString()}
                    onClick={() => {
                        setSelectedSchool(school.value)
                    }}>
                    <FindGroupsPopularSchools schoolName={school.value} />
                </div>
            ))}
        </>
    )
}
