import Menu from 'components/navigation/Menu'
import Footer from './general/Footer'
import Header from './navigation/Header'

const AppLayout = ({ children }) => {
    return (
        <div className='flex flex-col w-full'>
            <Menu />
            <div className='lg:pl-[18rem] bg-gray-50'>
                <Header />
                <div className='w-full min-h-[400px] lg:mt-[91px]'>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout
