import FlatButton from 'components/general/FlatButton'

const FindGroupsPopularSchools = ({ schoolName }) => {
    return (
        <>
            <div className='flex flex-col py-4 sm:px-48 px-32 md:w-full'>
                <FlatButton
                    className={
                        'md:text-xl xs:text-sm xs:w-full sm:text-md text-sm bg-slate-100 text-purple-1 border-solid border-dark-5 border-2 hover:bg-dark-1 hover:text-white hover:shadow-md' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
