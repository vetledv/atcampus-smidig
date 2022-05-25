import { CheckIcon } from '@heroicons/react/outline'

const ProgressBarTab = ({ step, value, active, completed }) => {
    const tab =
        'flex rounded-full bg-purple-4 w-7 h-7 justify-center items-center text-white'
    const activeTab =
        'flex bg-purple-1 rounded-full text-white w-10 h-10 justify-center items-center'
    const completedTab =
        'flex rounded-full bg-purple-1 text-white w-7 h-7 justify-center items-center'

    return (
        <div className='flex items-center'>
            <div
                className={active ? activeTab : completed ? completedTab : tab}>
                <span className={value > step + 1 ? 'invisible' : ''}>
                    {value === 4 ? <CheckIcon className='w-7 h-7' /> : value}
                </span>
            </div>

            {value! < 4 && (
                <div
                    className={
                        step >= value
                            ? 'bg-purple-1 h-1 w-8'
                            : 'bg-purple-4 h-1 w-8'
                    }></div>
            )}
        </div>
    )
}

export default ProgressBarTab
