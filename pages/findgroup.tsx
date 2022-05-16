import FlatButton from 'components/buttons/FlatButton'
import { FindGroupsFilter } from 'components/findgroups/FindGroupsFilter'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import FindGroupsPopularSchools from 'components/findgroups/FindGroupsPopularSchools'
import React from 'react'

const findgroup = () => {
    const items = [
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
                        <FindGroupsFilter items={items} />
                        <div>
                            <FindGroupsPopularSchools />
                            <div className='p-16'>
                                <FlatButton children={'Gå videre'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default findgroup
