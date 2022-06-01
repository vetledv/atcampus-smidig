import SelectGoal from 'components/findgroups/SelectGoal'
import SelectPreferances from 'components/findgroups/SelectPreferances'

const SelectGoals = ({
    setSelectedGoal,
    selectedGoal,
    selectedPreferences,
    setSelectedPreferances,
}: {
    setSelectedGoal: Function
    selectedGoal: Array<String>
    selectedPreferences: Array<String>
    setSelectedPreferances: Function
}) => {
    return (
        <div className='bg-white w-full lg:h-96'>
            <div className='flex flex-col justify-center p-4'>
                <SelectGoal
                    selectedGoal={selectedGoal}
                    setSelectedGoal={setSelectedGoal}
                />
                <SelectPreferances
                    setSelectedPreferances={setSelectedPreferances}
                    selectedPreferances={selectedPreferences}
                />
            </div>
        </div>
    )
}

export default SelectGoals
