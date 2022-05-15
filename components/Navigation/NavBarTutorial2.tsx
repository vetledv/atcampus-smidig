import Image from 'next/image'
import React, { useRef } from 'react'
import { useState } from 'react'
import useScrollPosition from './useScrollPos'

const NavBarTut2 = () => {
    const scrollPos = useScrollPosition()
    console.log(scrollPos)

    return (
        /*Navbar*/
        <nav className='bg-white w-screen container sticky top-0 mx-auto'>
            {/*Container with flex*/}
            <div className='flex py-6 px-12 justify-between items-center sticky'>
                <div className='pt-2 responsive hover:cursor-pointer'>
                    {/*Atcampus icon*/}
                    <Image
                        src={'/atcampus-full-logo.svg'}
                        alt={'atcampus logo'}
                        width={'125'}
                        height={'25'}></Image>
                </div>
                {/*Menu items*/}
                <div className='hidden items-end space-x-12 md:flex'>
                    <a
                        href='#features'
                        className='text-black font-medium hover:text-dark-2 focus:font-bold'>
                        Slik virker det
                    </a>
                    <a
                        href='#pricing'
                        className='text-black font-medium hover:text-dark-2 focus:font-bold'>
                        Priser
                    </a>
                    <a
                        href='#faq'
                        className='text-black font-medium hover:text-dark-2 focus:font-bold'>
                        FAQ
                    </a>
                </div>
                {/*Login button*/}
                <a
                    href='/login'
                    className='hidden p-3 px-8 pt-2 text-white font-bold items-center bg-gradient-left rounded-full baseline hover:bg-purple-2 md:block'>
                    {' '}
                    Kom i gang
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

export default NavBarTut2
