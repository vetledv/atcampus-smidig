import { DocumentTextIcon, HomeIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Menu() {
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
            name: 'Mine Grupper',
            icon: DocumentTextIcon,
            href: '/testpage',
            current: router.asPath === '/testpage',
        },
        {
            name: 'Finn Gruppe',
            icon: DocumentTextIcon,
            href: '/findgroup',
            current: router.asPath === '/findgroup',
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
        <div className='fixed top-0 left-0 flex-1 lg:flex flex-col min-h-screen bg-purple-5 lg:min-w-[18rem] hidden'>
            <div className='flex-1 flex flex-col pt-4 pb-4 overflow-y-auto'>
                <div className='flex items-center flex-shrink-0 px-4'>
                    <Image
                        tabIndex={0}
                        aria-label={'atcampus logo'}
                        className='ring-background-hover rounded'
                        width={'62'}
                        height={62}
                        src={'/atcampus-upper-left.png'}
                    />
                </div>
                <nav
                    className='mt-5 flex-1 px-2 space-y-1'
                    aria-label='Sidebar'>
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'border-2 border-solid border-purple-1'
                                    : 'text-purple-1 hover:border-purple-2 hover:border-solid hover:border-2',
                                'group flex items-center px-2 py-2 text-sm font-semibold rounded-md'
                            )}>
                            <item.icon
                                className='mr-3 flex-shrink-0 h-6 w-6 purple-1'
                                aria-hidden='true'
                            />
                            <span className='flex-1'>{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}
