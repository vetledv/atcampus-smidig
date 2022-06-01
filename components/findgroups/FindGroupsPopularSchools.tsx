import FlatButton from 'components/general/FlatButton'

const FindGroupsPopularSchools = ({
    schoolName,
    selectedSchool,
}: {
    schoolName: string
    selectedSchool: string
}) => {
    const classes =
        'xs:text-lg lg:text-xl font-regular bg-purple-1 text-white border-solid border-dark-5 border hover:bg-dark-1 hover:text-white hover:shadow-md hover:transition-all duration-200 ease-in-out transform hover:scale-105'
    return (
        <>
            <div className='flex flex-col my-4 w-4/5 '>
                <FlatButton
                    className={
                        selectedSchool === schoolName
                            ? classes
                            : 'xs:text-lg lg:text-xl font-regular bg-[#FFFFFF] text-purple-1 border-solid border-dark-5 border hover:bg-dark-1 hover:text-white hover:shadow-md hover:transition-all duration-200 ease-in-out transform hover:scale-105' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
