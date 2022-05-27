import FlatButton from 'components/general/FlatButton'

const FindGroupsPopularSchools = ({ schoolName }) => {
    return (
        <>
            <div className='flex flex-col py-4 sm:px-48 px-32 md:w-full'>
                <FlatButton
                    className={
                        'md:text-xl xs:text-sm xs:w-full sm:text-md text-sm bg-[#FFFFFF] text-purple-1 border-solid border-dark-5 border hover:bg-dark-1 hover:text-white hover:shadow-md hover:transition-all duration-200 ease-in-out transform hover:scale-105' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
