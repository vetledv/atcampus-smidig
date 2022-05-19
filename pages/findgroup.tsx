import FlatButton from 'components/buttons/FlatButton'
import ChooseSchool from 'components/findgroups/ChooseSchool'
import { FindGroupsFilter } from 'components/findgroups/FindGroupsFilter'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import FindGroupsPopularSchools from 'components/findgroups/FindGroupsPopularSchools'
import React, { useState } from 'react'
// Contents of this file will be moved. This page will serve the find group functionality.
// TODO: add steps to create a group

const FindGroupPage = () => {
    const [step, setStep] = useState(0)

    return (
        <>
            <div className='bg-dark-6 w-full'>
                <FindGroupsHeader step={'Velg skole'} />
                <div className='flex justify-center'>
                    <ChooseSchool />
                </div>
            </div>
        </>
    )
}

export default FindGroupPage
