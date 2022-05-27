import FlatButton from 'components/general/FlatButton'
import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

const Login = ({ providers }: { providers: GetServerSideProps }) => {
    return (
        <>
            <Head>
                <title>atcampus - Logg inn</title>
            </Head>
            <div className='h-screen w-screen p-4 flex justify-center items-center '>
                <div className=''>
                    <div className='text-center mt-2 mb-4 lg:mt-8'>
                        <Image
                            src={'/atcampus-full-logo.svg'}
                            width={208}
                            height={42}
                            alt='atcampus'
                        />
                    </div>
                    <div className='rounded p-8 bg-white  lg:my-16 lg:py-16 lg:px-20'>
                        <div className='mb-8 text-center'>
                            <p className='font-bold text-[40px]'>Kom i gang!</p>
                            <p className='text-sm'>
                                Av studenter. For studenter. For en gangs skyld.
                            </p>
                        </div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <FlatButton
                                        className={'w-full '}
                                        as='button'
                                        onClick={() =>
                                            signIn(provider.id, {
                                                callbackUrl: `${window.location.origin}/`,
                                            })
                                        }>
                                        Logg inn med {provider.name}
                                    </FlatButton>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {
            providers,
        },
    }
}
