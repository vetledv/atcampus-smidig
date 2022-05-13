import React, { useState } from 'react'
import onClickOutside, { HandleClickOutside } from 'react-onclickoutside'
import { ChevronDownIcon } from '@heroicons/react/solid'

function DropDown({ title = undefined, items, dropDownTitle }) {
    const [open, setOpen] = useState(false) // dropdown is open or not
    const [selection, setSelection] = useState()
    const toggle = () => setOpen(!open) // toggle dropdown
    DropDown.handleClickOutside = () => setOpen(false)

    const handleOnClick = (item) => {
        setSelection(item) //When an item in DD is clicked it is added to the selection. Use this to render the selected items.
        toggle() //Closes the dropdown
    }

    return (
        /*May need to resize*/
        <div className='rounded-standard input-shadow min-w-fit absolute w-4/5 bg-white'>
            <div tabIndex={0} onClick={() => toggle()}>
                <div className='flex justify-between px-6 cursor-pointer items-center'>
                    <div className='font-semibold text-lg text-purple-1 '>
                        {dropDownTitle}
                    </div>
                    <ChevronDownIcon className='h-12 w-12' />
                </div>
            </div>
            {open && (
                <ul>
                    {items?.map((item) => (
                        <li className={'list-none'} key={item.id}>
                            <div
                                onClick={() => handleOnClick(item)}
                                className={'w-full'}>
                                <div className='px-3 py-1 cursor-default text-md hover:bg-purple-5 bg-white rounded-standard'>
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
