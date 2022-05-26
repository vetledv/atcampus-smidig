import FlatButton from 'components/buttons/FlatButton'

const FindGroupsPopularSchools = ({ schoolName }) => {
    return (
        <>
            <div className='flex flex-col py-4 px-48 md:w-full'>
                <FlatButton
                    className={
                        'md:text-[24px] sm:text-md text-sm bg-slate-100 text-purple-1 border-solid border-dark-5 border-2 hover:bg-dark-1 hover:text-white hover:shadow-md' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
