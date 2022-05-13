import classNames from 'classnames'
import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

export default function TopSearch({}) {
    const handleChange = (e: { target: any }) => {
        const target = e.target
        const value = target.value
    }

    return (
        <div
            className={
                'flex border-2 rounded border-dark-3 focus-within:border-gradient-left bg-white input-shadow'
            }>
            <div className='flex px-6 items-center'>
                <SearchIcon className='w-6 h-6 text-dark-3' />
            </div>
            <div className='flex-grow'>
                <input
                    type='text'
                    name='top-search'
                    placeholder='Search Top Talent'
                    required
                    className='p-3 text-dark-3 text-md rounded font-semibold text-left bg-white-200 w-full outline-none'
                />
            </div>
        </div>
    )
}
