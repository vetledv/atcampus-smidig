import {
    DocumentTextIcon,
    HomeIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Menu() {
    const router = useRouter();
    const navigation = [
        {
            name: 'Components',
            icon: HomeIcon,
            href: '/',
            current: router.asPath === '/'
        },
        {
            name: 'Assignment',
            icon: DocumentTextIcon,
            href: '/assignment',
            current: router.asPath === '/assignment'
        }
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className="sticky top-0 left-0 flex-1 flex flex-col min-h-0 bg-gradient-to-r from-gradient-left to-gradient-right rounded-br-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <Image
                        tabIndex={0}
                        aria-label={'atcampus logo'}
                        className="ring-background-hover rounded"
                        width={139}
                        height={29}
                        src={'/atcampus-full-logo-white.svg'}
                    />
                </div>
                <nav
                    className="mt-5 flex-1 px-2 space-y-1"
                    aria-label="Sidebar"
                >
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-dark-1 text-white shadow'
                                    : 'text-white hover:bg-dark-1 hover:shadow',
                                'group flex items-center px-2 py-2 text-sm font-semibold rounded-md'
                            )}
                        >
                            <item.icon
                                className="mr-3 flex-shrink-0 h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}
