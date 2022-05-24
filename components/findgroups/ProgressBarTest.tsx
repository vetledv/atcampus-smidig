import ProgressBarTab from './ProgressBarTab'

const ProgressBarTest = ({ step, onClick }) => {
    const steps = [1, 2, 3, 4]
    console.log('step: ' + step)
    return (
        <div className='flex flex-row w-full justify-center items-center mt-2'>
            {steps.map((e) => (
                <ProgressBarTab
                    key={e}
                    onClick={onClick}
                    step={step}
                    value={e}
                    active={e === step + 1}
                    completed={e < step + 1}
                />
            ))}
        </div>
    )
}

export default ProgressBarTest
