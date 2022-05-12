import React, { useState } from 'react'

export default function Tabs({tabTextOne, tabTextTwo, tabTextThree}) {
    const [color, setColor] = useState(0)
 
    const selectedTab = 'border-b-4 border-purple-1 text-dark-1'

    const switchColor = (idx: React.SetStateAction<number>) => {
        setColor(idx)
    }
    return (
        <div className='flex bg-gray-200 my-3 justify-between text-md px-6'>
            <div>
                <div
                    onClick={() => switchColor(0)}
                    className={`${
                        color === 0 ? selectedTab : 'text-dark-3'
                    } py-2 px-6 font-semibold text-center cursor-pointer`}>
                    {tabTextOne}
                </div>
            </div>
            <div>
                <div
                    onClick={() => switchColor(1)}
                    className={`${
                        color === 1 ? selectedTab : 'text-dark-3'
                    } py-2 px-6 font-semibold text-center cursor-pointer`}>
                    {tabTextTwo}
                </div>
            </div>
            <div>
                <div
                    onClick={() => switchColor(2)}
                    className={`${
                        color === 2 ? selectedTab : 'text-dark-3'
                    } py-2 px-6 font-semibold text-center cursor-pointer`}>
                    {tabTextThree}
                </div>
            </div>
        </div>
    )
}
