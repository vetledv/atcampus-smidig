import Image from 'next/image'
import React, { useRef } from 'react'
import { useState } from 'react'
import useScrollPosition from './useScrollPos'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

/*useRef<btn>({ '#menu-btn': btn })
const nav = useRef('#menu')

btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    nav.classList.toggle('flex')
    nav.classList.toggle('hidden')
})
*/
export const NavBarTut = () => {
    const scrollPos = useScrollPosition()
    console.log(scrollPos)

    return (
        /*Navbar*/
        <nav
            className={classNames(
                scrollPos > false ? 'shadow' : 'shadow-none',
                'transition-shadow bg-purple-2 w-screen container sticky top-0 mx-auto'
            )}>
            {/*Container with flex*/}
            <div className='flex py-6  px-12 justify-between items-center'>
                <div className='pt-2 responsive hover:cursor-pointer'>
                    {/*Atcampus icon*/}
                    <Image
                        src={'/atcampus-full-logo-white.svg'}
                        alt={'atcampus logo'}
                        width={'125'}
                        height={'25'}></Image>
                </div>
                {/*Menu items*/}
                <div className='hidden items-end space-x-12 md:flex'>
                    <a
                        href='#features'
                        className='text-white font-medium hover:text-purple-4 focus:font-bold'>
                        Slik virker det
                    </a>
                    <a
                        href='#pricing'
                        className='text-white font-medium hover:text-purple-4 focus:font-bold'>
                        Priser
                    </a>
                    <a
                        href='#faq'
                        className='text-white font-medium hover:text-purple-4 focus:font-bold'>
                        FAQ
                    </a>
                </div>
                {/*Login button*/}
                <a
                    href='/login'
                    className='hidden p-3 px-8 pt-2 text-white font-bold bg-gradient-left rounded-full baseline hover:bg-purple-2 md:block'>
                    {' '}
                    Logg inn
                </a>
                {/*Hamborgir*/}
                <button
                    id='btn-menu'
                    className='hamburger focus:outline-none block md:hidden'>
                    <span className='burger-top'></span>
                    <span className='burger-mid'></span>
                    <span className='burger-bot'></span>
                </button>
            </div>
            {/*Mobile*/}
            <div className='md:hidden'>
                <div
                    id='menu-mobile'
                    className='flex-col absolute hidden items-center self-end py-12 space-y-6 font-bold bg-purple-2 sm:w-auto sm:self-center left-0 right-0 drop-shadow-md'>
                    <a href='#features'>Features</a>
                    <a href='#pricing'>Pricing</a>
                    <a href='#faq'>FAQ</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBarTut
