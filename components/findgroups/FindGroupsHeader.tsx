import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useMemo } from 'react'
import ProgressBar from '../general/ProgressBar'

const FindGroupsHeader = ({
    stepTitles,
    step,
    stepBack,
    nextStep,
    setStep,
}: {
    stepTitles: string[]
    step: number
    stepBack: () => void
    nextStep: () => void
    setStep: (step: number) => void
}) => {
    const stepper = useMemo(() => {
        return stepTitles.map((stepTitle, i) => {
            const isActive = i === step
            const isLast = i === stepTitles.length - 1
            return (
                i <= step && (
                    <div className='flex gap-2' key={i}>
                        <div
                            onClick={() => {
                                setStep(i)
                            }}
                            className={'hover:text-purple-2 cursor-pointer'}>
                            {stepTitle}
                        </div>
                        {!isActive && !isLast && <>/</>}
                    </div>
                )
            )
        })
    }, [stepTitles, step, setStep])

    return (
        <div className='bg-white lg:h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='lg:h-40 flex flex-col justify-between py-6 px-6 w-full'>
                    <div className='flex gap-2'>{stepper}</div>
                    <div className='flex flex-row w-full justify-center items-center mt-2'>
                        <ChevronLeftIcon
                            className='h-7 text-purple-1 mr-2 cursor-pointer'
                            onClick={stepBack}
                        />
                        <ProgressBar step={step} />
                        <ChevronRightIcon
                            className='h-7 text-purple-1 ml-2 cursor-pointer'
                            onClick={nextStep}
                        />
                    </div>
                    <div className='text-2xl'>{stepTitles[step]}</div>
                </div>

                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
