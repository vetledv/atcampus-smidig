import { PlusCircleIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface FindOrCreateProps {
    children: React.ReactNode
    onClick?: () => void
}

const FindOrCreateBtn: FC<FindOrCreateProps> = ({ children, onClick }) => {
    return (
        <div
            onClick={onClick}
            className='flex bg-white px-16 py-4 h-fit border border-purple-4 shadow-sm hover:shadow-md hover:shadow-purple-4 shadow-purple-4 rounded-md  cursor-pointer'>
            <div className='flex flex-col items-center w-full'>
                <PlusCircleIcon className='text-dark-3 w-6 h-6' />
                <h1 className='text-5xl  text-dark-3  whitespace-nowrap text-center'>
                    {children}
                </h1>
            </div>
        </div>
    )
}

export default FindOrCreateBtn
