import Menu from 'components/navigation/Menu'
import Footer from './general/Footer'
import Header from './navigation/Header'

const AppLayout = ({ children }) => {
    return (
        <div className='flex flex-col w-full'>
            <Menu />
            <div className='xl:pl-[18rem] bg-gray-50'>
                <Header />
                <div className='w-full min-h-screen xl:mt-[91px] flex flex-col'>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout
