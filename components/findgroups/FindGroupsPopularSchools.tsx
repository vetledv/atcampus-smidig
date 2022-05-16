import FlatButton from 'components/buttons/FlatButton'
import React from 'react'

const FindGroupsPopularSchools = () => {
    return (
        <>
            <div className='font-semibold text-xl text-dark-1 p-4'>
                Populære institusjoner
            </div>
            <div className='flex flex-col py-4 px-48 '>
                <FlatButton
                    className={
                        'text-2xl bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow'
                    }
                    children={'skole 1'}
                />
            </div>
            <div className='flex flex-col py-4 px-48 '>
                <FlatButton
                    className={
                        'text-2xl bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow'
                    }
                    children={'skole 1'}
                />
            </div>
            <div className='flex flex-col py-4 px-48 '>
                <FlatButton
                    className={
                        'text-2xl bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow'
                    }
                    children={'skole 1'}
                />
            </div>
            <div className='flex flex-col py-4 px-48 '>
                <FlatButton
                    className={
                        'text-2xl bg-slate-200 text-purple-1 border-solid border-purple-1 hover:bg-purple-5 hover:input-shadow'
                    }
                    children={'skole 1'}
                />
            </div>
        </>
    )
}

export default FindGroupsPopularSchools
