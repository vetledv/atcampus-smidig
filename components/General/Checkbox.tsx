import classNames from "classnames";
import { useState } from "react";

const Checkbox = ({
    type = 'checkbox',
    value,
    id,
    name,
    className,
}) => {
    const [isChecked, setIsChecked] = useState(false)
    const box = 'block cursor-pointer relative w-20 md-w-auto p-2 ml-2 text-md text-center rounded-standard border-2 font-normal'
    const checkedBox = 'text-purple-1 bg-white hover:shadow-md hover:shadow-purple-2/50'
    const uncheckedBox = 'text-white bg-purple-1 hover:shadow-md hover:shadow-purple-2/50 active:bg-purple-1/70'

    let classes = classNames(
        isChecked ? `${box} ${uncheckedBox}` : `${box} ${checkedBox}`,
        className
    )

    return (
        <label
            className={classes}>
            <input
                name={name}
                value={value}
                className='invisible absolute'
                data-attribute={id}
                type={type}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.currentTarget.checked)}
            />
            <span>{name}</span>
        </label>
    )
}

export default Checkbox