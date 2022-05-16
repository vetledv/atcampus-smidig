import Menu from 'components/navigation/Menu'
import Footer from './general/Footer'
import Header from './navigation/Header'

const AppLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='h-full flex flex-row'>
                <div className='w-96 relative'>
                    <Menu />
                </div>
                <div className='w-full'>
                    <div className='my-8'>
                        <Header />
                    </div>
                    {children}
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default AppLayout
