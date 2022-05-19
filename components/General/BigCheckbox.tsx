import { AcademicCapIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useState } from "react";

const BigCheckbox = ({
    type = 'checkbox',
    value,
    id,
    name,
    className,
}) => {
    const [isChecked, setIsChecked] = useState(false)
    const box = 'flex cursor-pointer w-64 text-md items-center h-20 text-center rounded-standard border-2 font-normal'
    const checkedBox = 'text-purple-1 bg-white hover:shadow-md hover:shadow-purple-2/50'
    const uncheckedBox = 'text-white bg-purple-1 hover:shadow-md hover:shadow-purple-2/50 active:bg-purple-1/70'

    let classes = classNames(
        isChecked ? `${box} ${checkedBox}` : `${box} ${uncheckedBox}`,
        className
    )

    return (
        <label
            className={classes}>
            <span className=
            'flex-none w-16 h-full px-3 py-4 bg-gradient-to-r from-gradient-left to-gradient-right text-white rounded-l'>
                {<AcademicCapIcon />}
            </span>
            <input
                name={name}
                value={value}
                className='invisible absolute'
                data-attribute={id}
                type={type}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.currentTarget.checked)}
            />
            <span className="w-full">{name}</span>
        </label>
    )
}

export default BigCheckbox