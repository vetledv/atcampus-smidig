import { DocumentTextIcon, HomeIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuIcon, CollectionIcon, MailIcon } from '@heroicons/react/outline'
import MobileNav from './MobileNav'
import MenuNavigation from './MenuNavigation'

export default function Menu() {
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
            <MobileNav />
        </>
    )
}
