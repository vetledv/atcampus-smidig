import SelectGoal from 'components/findgroups/SelectGoal'
import SelectPreferances from 'components/findgroups/SelectPreferances'

const SelectGoals = () => {
    return (
        <div className='bg-white w-full h-96'>
            <div className='flex flex-col justify-center p-4'>
                <SelectGoal />
                <SelectPreferances />
            </div>
        </div>
    )
}

export default SelectGoals
