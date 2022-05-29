import Image from 'next/image'
import { useState } from 'react'
import MenuNavigation from './MenuNavigation'
import MobileNav from './MobileNav'
import { XIcon } from '@heroicons/react/solid'

export default function Menu() {
    const [open, setOpen] = useState(false) // dropdown is open or not
    const toggle = () => setOpen(!open) // toggle dropdown

    return (
        <>
            <div className='fixed top-0 left-0 flex-1 xl:flex flex-col min-h-screen bg-purple-5 xl:min-w-[18rem] hidden'>
                <div className='flex-1 flex flex-col pt-5 pb-5 overflow-y-auto'>
                    <div className='flex items-center flex-shrink-0 px-5'>
                        <Image
                            tabIndex={0}
                            aria-label={'atcampus logo'}
                            className='ring-background-hover rounded'
                            width={'62'}
                            height={62}
                            src={'/atcampus-upper-left.png'}
                        />
                    </div>
                    <MenuNavigation />
                </div>
            </div>
            <MobileNav toggle={() => toggle()} />
            {open && (
                <div className='fixed visible xl:invisible h-full w-10/12 bg-dark-6 z-[900] border border-dark-5'>
                    <div className='flex w-full px-6 py-4 bg-white shadow justify-between items-center'>
                        <div className='h-fit'>
                            <Image
                                tabIndex={0}
                                aria-label={'atcampus logo'}
                                width={139}
                                height={29}
                                src={'/atcampus-full-logo.svg'}
                            />
                        </div>
                        <XIcon
                            onClick={() => toggle()}
                            className='w-10 h-10 cursor-pointer'></XIcon>
                    </div>
                    <MenuNavigation />
                </div>
            )}
        </>
    )
}
