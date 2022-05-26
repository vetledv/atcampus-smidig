import Menu from 'components/navigation/Menu'
import Footer from './general/Footer'
import Header from './navigation/Header'

const AppLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-full w-full'>
            <div className='h-full flex flex-row w-full '>
                <Menu />
                <div className='w-full lg:pl-[18rem]'>
                    <Header />
                    <div className='w-full min-h-[400px] lg:mt-[98px] '>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default AppLayout
