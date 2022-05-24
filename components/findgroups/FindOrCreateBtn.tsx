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
            className='flex  justify-center bg-white px-16 py-4 border-dark-5 rounded-md hover:shadow-md'>
            <div className=' items-center text-center justify-center '>
                <PlusCircleIcon className='text-dark-3 w-8 ml-8 ' />
                <h1 className='text-5xl text-dark-3  text-center '>
                    {children}
                </h1>
            </div>
        </div>
    )
}

export default FindOrCreateBtn
