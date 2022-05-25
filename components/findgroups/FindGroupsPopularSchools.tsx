import FlatButton from 'components/buttons/FlatButton'

const FindGroupsPopularSchools = ({ schoolName }) => {
    return (
        <>
            <div className='flex flex-col py-4 px-48'>
                <FlatButton
                    className={
                        'text-[24px] bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-3 hover:text-slate-100 hover:shadow-md text' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
