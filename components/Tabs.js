import React, { useState } from "react";

export default function Tabs() {
    const [color, setColor] = useState(0);

    const defaultColor = 'bg-purple-1 text-white';

    const switchColor = (idx) => {
        setColor(idx);
    }
    return (
        <div className="flex bg-gray-200 my-3 justify-between text-md">
            <div onClick={() => switchColor(0)} className={`${color === 0 ? defaultColor : 'bg-gray-200'} p-2 font-semibold text-center rounded w-full cursor-pointer`}>Popular</div>
            <div onClick={() => switchColor(1)} className={`${color === 1 ? defaultColor : 'bg-gray-200'} p-2 font-semibold text-center w-full cursor-pointer`}>Recent</div>
            <div onClick={() => switchColor(2)} className={`${color === 2 ? defaultColor : 'bg-gray-200'} p-2 font-semibold text-center rounded w-full cursor-pointer`}>Unanswered</div>
        </div>
    )
}
