import React, { useState } from 'react'

const GroupNav = () => {
    const [active, setActive] = useState(0)
    console.log(active)
    return (
        <div className={'h-12 min-w-96 max-w-6xl bg-white '}>
            <div className='flex justify-between h-full'>
                <ul className='flex flex-row justify-evenly px-6 space-x-12 items-end font-medium text-dark-3  '>
                    <div onClick={() => setActive(0)}>
                        <button className={'active===0 text-dark-3'}>
                            Group Name
                        </button>
                        <div
                            className={
                                'active===0 h-1 w-full bg-purple-1 opacity-0'
                            }></div>
                        {active === 0 && (
                                <button className='text-dark-1'>
                                    Group Name
                                </button>
                            ) && (
                                <div className='h-1  w-full bg-purple-1 opacity-1'></div>
                            )}
                    </div>
                    <div onClick={() => setActive(1)}>
                        <button className={'active===1 text-dark-3'}>
                            Chat
                        </button>
                        <div
                            className={
                                'active===1 h-1  w-full bg-purple-1 opacity-0'
                            }></div>
                        {active === 1 && (
                                <button className='text-dark-1'>Chat</button>
                            ) && (
                                <div className='h-1 w-full bg-purple-1 opacity-1'></div>
                            )}
                    </div>
                    <div onClick={() => setActive(2)}>
                        <button className={'active===2 text-dark-3'}>
                            Calendar
                        </button>
                        <div
                            className={
                                'active===2 h-1  w-full bg-purple-1 opacity-0'
                            }></div>
                        {active === 2 && (
                                <button className='text-dark-1'>
                                    Calendar
                                </button>
                            ) && (
                                <div className='h-1 w-full bg-purple-1 opacity-1'></div>
                            )}
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default GroupNav
