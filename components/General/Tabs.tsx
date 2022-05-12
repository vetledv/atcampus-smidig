import React, { useState } from 'react'

export default function Tabs() {
    const [color, setColor] = useState(0)
 
    const selectedTab = 'border-b-4 border-purple-1 text-dark-1'

    const switchColor = (idx: React.SetStateAction<number>) => {
        setColor(idx)
    }
    return (
        <div className='flex bg-gray-200 my-3 justify-between text-md px-3'>
            <div className='px-3'>
                <div
                    onClick={() => switchColor(0)}
                    className={`${
                        color === 0 ? selectedTab : 'text-dark-3'
                    } p-2 font-semibold text-center cursor-pointer`}>
                    Popular
                </div>
            </div>
            <div className='px-3'>
                <div
                    onClick={() => switchColor(1)}
                    className={`${
                        color === 1 ? selectedTab : 'text-dark-3'
                    } p-2 font-semibold text-center cursor-pointer`}>
                    Recent
                </div>
            </div>
            <div className='px-3'>
                <div
                    onClick={() => switchColor(2)}
                    className={`${
                        color === 2 ? selectedTab : 'text-dark-3'
                    } p-2 font-semibold text-center cursor-pointer`}>
                    Unanswered
                </div>
            </div>
        </div>
    )
}
