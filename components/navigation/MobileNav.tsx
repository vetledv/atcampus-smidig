import { CollectionIcon, MailIcon, MenuIcon } from '@heroicons/react/outline'

const MobileNav = ({ toggle }: { toggle: () => void }) => {
    return (
        <div className='flex flex-row items-end justify-around m-0 p-0 text-dark-1 bg-white visible xl:hidden fixed bottom-0 w-full z-50'>
            <div
                className='flex flex-col items-center w-20 cursor-pointer'
                onClick={toggle}>
                <MenuIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Menu</div>
            </div>
            <div className='w-20 flex flex-col items-center cursor-pointer'>
                <CollectionIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Spørsmål</div>
            </div>
            <div className='flex flex-col items-center w-20 cursor-pointer'>
                <MailIcon className={'w-5 h-5 xs:w-6 xs:h-6 p-0 mt-2'} />
                <div className='text-xs mb-2'>Flashcards</div>
            </div>
        </div>
    )
}

export default MobileNav
