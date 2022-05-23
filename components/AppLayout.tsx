import Menu from 'components/navigationtemp/Menu'
import Footer from './generaltemp/Footer'
import Header from './navigationtemp/Header'

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
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default AppLayout
