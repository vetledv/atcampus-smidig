import Menu from 'components/navigation/Menu'
import Footer from './general/Footer'
import Header from './navigation/Header'

const AppLayout = ({ children }) => {
    return (
        <div className='flex flex-col w-full flex-wrap'>
            <Menu />
            <div className='xl:pl-[18rem] bg-gray-50'>
                <Header />
                <div className='w-full min-h-screen lg:mt-[91px] flex flex-col mb-20 lg:mb-0'>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout
