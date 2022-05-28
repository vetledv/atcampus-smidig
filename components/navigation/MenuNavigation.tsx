import { HomeIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'

const MenuNavigation = () => {
    const router = useRouter()
    const navigation = [
        {
            name: 'Home',
            icon: HomeIcon,
            href: '/',
            current: router.asPath === '/',
        },
        {
            name: 'Kollokviegrupper',
            icon: DocumentTextIcon,
            href: '/groups',
            current: router.asPath === '/groups',
        },
        {
            name: 'Finn Gruppe',
            icon: DocumentTextIcon,
            href: '/groups/findgroup',
            current: router.asPath === '/groups/findgroup',
        },
        {
            name: 'testjoingroup',
            icon: DocumentTextIcon,
            href: '/testjoingroup',
            current: router.asPath === '/testjoingroup',
        },
        {
            name: 'testcreategroup',
            icon: DocumentTextIcon,
            href: '/testcreate',
            current: router.asPath === '/testcreate',
        },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <nav className='mt-5 flex-1 px-2 space-y-2' aria-label='Sidebar'>
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'outline outline-2 outline-purple-1'
                            : 'text-purple-1 hover:border-purple-2 hover:outline hover:outline-2',
                        'group flex items-center px-2 py-2 text-sm font-semibold rounded-md '
                    )}>
                    <item.icon
                        className='mr-3 flex-shrink-0 h-6 w-6 purple-1'
                        aria-hidden='true'
                    />
                    <span className='flex-1'>{item.name}</span>
                </a>
            ))}
        </nav>
    )
}

export default MenuNavigation
