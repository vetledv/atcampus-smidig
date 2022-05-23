import ProgressBar from 'components/generaltemp/ProgressBar'

const FindGroupsHeader = ({ stepTitle }) => {
    return (
        <div className='bg-white h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='h-40 flex flex-col justify-between py-6 px-6'>
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
                    ) : (
                        <div>
                            Kollokviegrupper / <b>{stepTitle}</b>
                        </div>
                    )}
                    <div className='text-2xl'>{stepTitle}</div>
                </div>

                <div className='pr-16'></div>
                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
