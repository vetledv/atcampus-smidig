import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'

function DropDown({
    title = undefined,
    items,
    dropDownTitle,
    setSelectedSchool,
}) {
    const [open, setOpen] = useState(false) // dropdown is open or not
    const [selection, setSelection] = useState()
    const toggle = () => setOpen(!open) // toggle dropdown
    DropDown.handleClickOutside = () => setOpen(false)

    const handleOnClick = (item) => {
        setSelection(item) //When an item in DD is clicked it is added to the selection. Use this to render the selected items.
        toggle() //Closes the dropdown
        setSelectedSchool(item.value) //Sets the selected school in the parent component
    }

    return (
        /*May need to resize*/
        <div className='rounded-standard border border-solid border-dark-5 min-w-fit max-w-screen-lg md:w-1/3 xl:w-1/4 bg-white absolute ease-in-out duration-200'>
            <div tabIndex={0} onClick={() => toggle()}>
                <div className='flex justify-between px-6 cursor-pointer items-center'>
                    <div className='font-semibold text-lg text-purple-1 w-48 '>
                        {dropDownTitle}
                    </div>
                    <ChevronDownIcon className='h-12 w-12 fill-gray-800' />
                </div>
            </div>
            {open && (
                <ul>
                    {items?.map((item) => (
                        <li className={'list-none'} key={item.id}>
                            <div
                                onClick={() => handleOnClick(item)}
                                className={'w-full'}>
                                <div
                                    className='px-3 py-1 cursor-default text-md hover:bg-purple-5 bg-white rounded-standard'
                                    onClick={handleOnClick}>
                                    {item.value}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => DropDown.handleClickOutside,
}

export default onClickOutside(DropDown, clickOutsideConfig)

namespace DropDown {
    export let handleClickOutside: () => void
}
