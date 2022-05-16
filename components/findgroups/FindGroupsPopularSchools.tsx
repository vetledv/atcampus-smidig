import FlatButton from 'components/buttons/FlatButton'
import React from 'react'

const FindGroupsPopularSchools = () => {
    return (
        <>
            <div className='flex flex-col py-4 px-48 '>
                <FlatButton
                    className={
                        'text-2xl bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow'
                    }>
                    skole 1
                </FlatButton>
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
