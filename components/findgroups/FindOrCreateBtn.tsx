import { PlusCircleIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface FindOrCreateProps {
    children: React.ReactNode
    onClick?: () => void
}

const FindOrCreateBtn: FC<FindOrCreateProps> = ({ children, onClick }) => {
    return (
        <div
            onClick={() => onClick}
            className='flex bg-white px-16 py-4 h-fit border-dark-5 rounded-md hover:shadow-md cursor-pointer'>
            <div className='flex flex-col items-center w-full'>
                <PlusCircleIcon className='text-dark-3 w-8' />
                <h1 className='text-5xl whitespace-nowrap text-dark-3  text-center '>
                    {children}
                </h1>
            </div>
        </div>
    )
}

export default FindOrCreateBtn
