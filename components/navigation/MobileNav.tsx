import { MenuIcon, CollectionIcon, MailIcon } from '@heroicons/react/outline'
import React from 'react'
import { useState } from 'react'
import MenuNavigation from './MenuNavigation'

const MobileNav = () => {
    const [open, setOpen] = useState(false) // dropdown is open or not
    const toggle = () => setOpen(!open) // toggle dropdown

    return (
        <div className='flex flex-row items-end justify-around m-0 p-0 text-dark-1 bg-white visible xl:hidden fixed bottom-0 w-full'>
            <div
                className='flex flex-col items-center w-20'
                onClick={() => toggle()}>
                {open && (
                    <div className='relative ml-6 bg-dark-6 z-[534536543] border border-dark-5 rounded-standard'>
                        <MenuNavigation />
                    </div>
                )}
                <MenuIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Menu</div>
            </div>
            <div className='w-20 flex flex-col items-center'>
                <CollectionIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Spørsmål</div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <MailIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Flashcards</div>
            </div>
        </div>
    )
}

export default MobileNav
