import Menu from '@/components/navigation/Menu'
import { useRouter } from 'next/router'
import Footer from '@/components/general/Footer'
import Header from '@/components/navigation/Header'
import { ReactNode } from 'react'

const AppLayout = ({ children }: { children: ReactNode }) => {
    const { asPath } = useRouter()
    return (
        <>
            {asPath !== '/auth/login' ? (
                <div className='flex flex-col w-full'>
                    <Menu />
                    <div className='xl:pl-[18rem] bg-dark-6'>
                        <Header />
                        <div className='w-full mb-12 lg:mb-0 min-h-screen xl:mt-[91px] flex flex-col'>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
            ) : (
                <div>{children}</div>
            )}
        </>
    )
}

export default AppLayout
