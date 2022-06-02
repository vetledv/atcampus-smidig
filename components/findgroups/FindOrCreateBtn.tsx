import { PlusCircleIcon } from '@heroicons/react/outline'
import type { FC } from 'react'

interface FindOrCreateProps {
    children: React.ReactNode
    onClick?: () => void
}

const FindOrCreateBtn: FC<FindOrCreateProps> = ({ children, onClick }) => {
    return (
        <div
            onClick={onClick}
            className='group flex bg-white px-16 py-4 h-fit border rounded-md cursor-pointer border-purple-4 shadow-sm hover:shadow-md hover:shadow-purple-4 shadow-purple-4'>
            <div className='flex flex-col items-center w-full'>
                <PlusCircleIcon className='text-dark-3 w-6 h-6 group-hover:text-purple-2' />
                <h1 className='text-5xl text-dark-3 whitespace-nowrap text-center group-hover:text-purple-2'>
                    {children}
                </h1>
            </div>
        </div>
    )
}

export default FindOrCreateBtn
