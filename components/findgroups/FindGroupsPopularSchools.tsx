import FlatButton from 'components/buttons/FlatButton'
import React from 'react'

const FindGroupsPopularSchools = ({ schoolName }) => {
    return (
        <>
            <div className='flex flex-col py-3 px-48'>
                <FlatButton
                    className={
                        'text-[24px] bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow text' //text size somehow doesn't work properly
                    }>
                    {schoolName}
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
