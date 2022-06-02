import Image from 'next/image'

const Footer = () => {
    return (
        <div className='lg:flex flex-col align-center justify-center py-8 hidden lg:visible'>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                {/* Column1 */}
                <div className='col mt-1 flex-2 px-12 text-dark-2'>
                    <div className='image'>
                        <Image
                            tabIndex={0}
                            aria-label={'atcampus logo'}
                            className='ring-background-hover rounded'
                            width={139}
                            height={29}
                            src={'/atcampus-full-logo.svg'}
                        />
                    </div>
                    <ul className='list-unstyled space-y-3'>
                        <li>Get unstuck.</li>
                        <li>&copy;{new Date().getFullYear()} atcampus AS</li>
                        <li>
                            <div className='row flex justify-center'>
                                {/* Media 1 */}
                                <div className='image px-3'>
                                    <Image
                                        tabIndex={0}
                                        aria-label={'facebook logo'}
                                        className='ring-background-hover rounded'
                                        width={20}
                                        height={38}
                                        src={'/facebook-logo.svg'}
                                    />
                                </div>
                                {/* Media 2 */}
                                <div className='image px-3'>
                                    <Image
                                        tabIndex={0}
                                        aria-label={'instagram logo'}
                                        className='ring-background-hover rounded'
                                        width={20}
                                        height={38}
                                        src={'/instagram-logo.svg'}
                                    />
                                </div>
                                {/* Media 3 */}
                                <div className='image px-3'>
                                    <Image
                                        tabIndex={0}
                                        aria-label={'twitter logo'}
                                        className='ring-background-hover rounded'
                                        width={20}
                                        height={38}
                                        src={'/twitter-logo.svg'}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Column2 */}
                <div className='col mt-1 flex-2 px-12 text-dark-2'>
                    <h4 className='font-semibold'>VÅRE RETNINGSLINJER</h4>
                    <ul className='list-unstyled space-y-3 '>
                        <li>Regler</li>
                        <li>Vilkår</li>
                        <li>Salgsbetingelser</li>
                        <li>Personvernserklæring</li>
                    </ul>
                </div>
                {/* Column3 */}
                <div className='col mt-1 flex-2 px-12 text-dark-2'>
                    <h4 className='font-semibold'>ATCAMPUS</h4>
                    <ul className='list-unstyled space-y-3'>
                        <li>Om oss</li>
                        <li>Kontakt oss</li>
                        <li>Blogg</li>
                        <li>Jobber</li>
                    </ul>
                </div>
            </div>
            <div className='pt-8 pb-4 px-12'>
                <hr />
            </div>
            <div className='image flex justify-center mt-3'>
                <Image
                    tabIndex={0}
                    aria-label={'apple-appstore logo'}
                    className='ring-background-hover rounded'
                    width={135}
                    height={50}
                    src={'/apple-appstore.svg'}
                />
            </div>
            <div className='row flex justify-center text-dark-2'>
                <p className='col-sm'>
                    &copy;{new Date().getFullYear()} atcampus AS. All rights
                    reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
