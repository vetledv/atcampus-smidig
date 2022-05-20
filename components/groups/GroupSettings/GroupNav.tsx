import React, { useState } from 'react'

const GroupNav = () => {
    const [active, setActive] = useState(0)
    console.log(active)
    return (
        <div className={'h-12 min-w-96 max-w-6xl bg-white '}>
            <div className='flex justify-between h-full'>
                <ul className='flex flex-row justify-evenly px-6 space-x-12 items-end font-medium text-dark-3  '>
                    <div onClick={() => setActive(0)}>
                        <button
                            className={
                                active === 0
                                    ? 'text-dark-1 border-b-4  border-purple-1'
                                    : ' ' +
                                      ' text-dark-3 border-b-4 border-white'
                            }>
                            *Gruppenavn*
                        </button>
                    </div>
                    <div onClick={() => setActive(1)}>
                        <button
                            className={
                                active === 1
                                    ? 'text-dark-1 border-b-4  border-purple-1'
                                    : ' ' +
                                      ' text-dark-3 border-b-4 border-white'
                            }>
                            Chat
                        </button>
                    </div>
                    <div onClick={() => setActive(2)}>
                        <button
                            className={
                                active === 2
                                    ? 'text-dark-1 border-b-4  border-purple-1'
                                    : ' ' +
                                      ' text-dark-3 border-b-4 border-white'
                            }>
                            Kalender
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default GroupNav
