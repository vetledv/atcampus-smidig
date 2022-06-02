import TopSearch from 'components/general/TopSearch'
import FlatButton from 'components/general/FlatButton'

const Header = () => {
    return (
        <div className='flex border-b xl:top-0 xl:left-72 xl:right-0 justify-center z-50 bg-purple-5 px-4 py-6 xl:fixed '>
            <div className='flex w-full xl:w-9/12 items-center'>
                <div className='w-full xl:px-6 xl:align xl:w-9/12'>
                    <TopSearch title={'Søk'} />
                </div>
                <div className='hidden xl:block xl:px-6 xl:w-3/12 hover:transition-all duration-200 ease-in-out transform hover:scale-105'>
                    <FlatButton>Still Spørsmål</FlatButton>
                </div>
            </div>
        </div>
    )
}

export default Header
