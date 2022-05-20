import ProgressBar from 'components/general/ProgressBar'

const FindGroupsHeader = ({ stepTitle }) => {
    return (
        <div className='bg-white h-40 input-shadow text-dark-1'>
            <div className='flex items-center justify-between'>
                <div className='h-40 flex flex-col justify-between py-6 px-6'>
                    <div>Kollokviegrupper / {stepTitle}</div>
                    <div className='text-2xl'>{stepTitle}</div>
                </div>

                <div className='pr-16'></div>
                <ProgressBar />
                <div></div>
            </div>
        </div>
    )
}

export default FindGroupsHeader
