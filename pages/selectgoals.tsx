import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import SelectGoal from 'components/findgroups/SelectGoal'
import SelectPreferances from 'components/findgroups/SelectPreferances'
import { useState } from 'react'

const SelectGoals = () => {
    return (
        <div className='bg-white w-full'>
            <FindGroupsHeader />
            <div className='flex flex-col justify-center p-4'>
                <SelectGoal />
                <SelectPreferances />
            </div>
        </div>
    )
}

export default SelectGoals
