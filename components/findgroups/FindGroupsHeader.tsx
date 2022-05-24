import ProgressBar from 'components/general/ProgressBar'
import ProgressBarTest from './ProgressBarTest'

const FindGroupsHeader = ({ stepTitle, step }) => {
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
                    <ProgressBarTest step={step} onClick={null} />
                    <div className='text-2xl'>{stepTitle}</div>
                </div>

                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
