import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import ProgressBar from 'components/general/ProgressBar'
import ProgressBarTest from './ProgressBarTest'

const FindGroupsHeader = ({ stepTitle, step, stepBack, nextStep }) => {
    return (
        <div className='bg-white h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='h-40 flex flex-col justify-between py-6 px-6 w-full'>
                    {stepTitle === 'Velg skole' ? (
                        <div>
                            Kollokviegrupper / <b>{stepTitle}</b>
                        </div>
                    ) : stepTitle === 'Velg Fag' ? (
                        <div>
                            Kollokviegrupper / Velg Skole / <b>{stepTitle}</b>
                        </div>
                    ) : stepTitle === 'Velg Mål' ? (
                        <div>
                            Kollokviegrupper / Velg Skole / Velg Fag /{' '}
                            <b>{stepTitle}</b>
                        </div>
                    ) : stepTitle === 'Gruppeforslag' ? (
                        <div>
                            Kollokviegrupper / Velg Skole / Velg Fag / Velg Mål
                            / <b>{stepTitle}</b>
                        </div>
                    ) : (
                        <div>
                            Kollokviegrupper / <b>{stepTitle}</b>
                        </div>
                    )}
                    <div className='flex flex-row w-full justify-center items-center mt-2 cursor-pointer'>
                        <ChevronLeftIcon
                            className='h-7 text-purple-1 mr-2'
                            onClick={stepBack}
                        />
                        <ProgressBarTest step={step} />
                        <ChevronRightIcon
                            className='h-7 text-purple-1 ml-2 cursor-pointer'
                            onClick={nextStep}
                        />
                    </div>
                    <div className='text-2xl'>{stepTitle}</div>
                </div>

                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
