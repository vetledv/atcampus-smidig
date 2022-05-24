import { CheckIcon } from '@heroicons/react/outline'
const ProgressBarTest = ({ step }) => {
    const tab =
        'flex rounded-full bg-purple-4 w-7 h-7 justify-center items-center'
    const activeTab =
        'flex rounded-full bg-purple-1 text-white w-10 h-10 justify-center items-center'

    return (
        <div className='flex flex-row w-full justify-center items-center mt-2'>
            <div className={step >= 0 ? activeTab : tab}>
                <span>1</span>
            </div>

            <div
                className={
                    step > 0 ? 'bg-purple-1 h-1 w-8' : 'bg-purple-4 h-1 w-8'
                }></div>
            <div className={step >= 1 ? activeTab : tab}>
                <span className={step < 1 ? 'invisible' : ''}>2</span>
            </div>

            <div
                className={
                    step > 1 ? 'bg-purple-1 h-1 w-8' : 'bg-purple-4 h-1 w-8'
                }></div>
            <div className={step >= 2 ? activeTab : tab}>
                <span className={step < 2 ? 'invisible' : ''}>3</span>
            </div>

            <div
                className={
                    step > 2 ? 'bg-purple-1 h-1 w-8' : 'bg-purple-4 h-1 w-8'
                }></div>
            <div className={step >= 3 ? activeTab : tab}>
                <span className={step < 3 ? 'invisible' : 'w-7 h-7'}>
                    {<CheckIcon />}
                </span>
            </div>
        </div>
    )
}

export default ProgressBarTest
