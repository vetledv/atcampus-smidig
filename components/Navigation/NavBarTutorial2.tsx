import Image from 'next/image'
import React, { useRef } from 'react'
import { useState } from 'react'
import useScrollPosition from '../../hooks/useScrollPos'

const NavBarTut2 = () => {
    const scrollPos = useScrollPosition()
    //console.log(scrollPos)

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    const handleBurgerClick = () => {
        setIsBurgerOpen(!isBurgerOpen)
        console.log(isBurgerOpen)
    }

    return (
        /*Navbar*/
        <nav
            className={`${
                scrollPos ? '-top-24 ' : 'top-0 '
            } bg-white w-screen sticky top-0 transition-all`}>
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
                    className={`hamburger focus:outline-none block visible sm:visible md:hidden text-black bg-black`}
                    onClick={() => handleBurgerClick()}>
                    <span
                        className={`burger-top ${
                            isBurgerOpen ? 'open' : ''
                        }`}></span>
                    <span
                        className={`burger-mid ${
                            isBurgerOpen ? 'open' : ''
                        }`}></span>
                    <span
                        className={`burger-bot ${
                            isBurgerOpen ? 'open' : ''
                        }`}></span>
                </button>
            </div>
            {/*Mobile*/}
            <div className={`${isBurgerOpen ? 'visible' : 'hidden'}`}>
                <div
                    id='menu-mobile'
                    className='flex-col absolute items-center self-end py-12 space-y-6 font-bold bg-purple-2 sm:w-auto sm:self-center left-0 right-0 drop-shadow-md'>
                    <a href='#features'>Features</a>
                    <a href='#pricing'>Pricing</a>
                    <a href='#faq'>FAQ</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBarTut2
