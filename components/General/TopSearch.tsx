import classNames from 'classnames'
import { SearchIcon } from '@heroicons/react/outline'

export default function TopSearch({}) {
    const handleChange = (e: { target: any }) => {
        const target = e.target
        const value = target.value
    }

    return (
        <div className='flex border-2 border-gradient-left rounded'>
            <div className='flex-grow'>
                <input
                    type='text'
                    name='top-search'
                    placeholder='Search Top Talent'
                    required
                    className='p-3 text-dark-3 text-md rounded font-semibold text-center bg-white-200 w-full outline-none'
                />
            </div>
            <div className='flex bg-gradient-left px-6 items-center'>
                <SearchIcon className='w-6 h-6 text-white' />
            </div>
        </div>
    )
}
