import FlatButton from 'components/buttons/FlatButton'
import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = ({ providers }: { providers: GetServerSideProps }) => {
    return (
        <div className='h-screen w-screen p-4'>
            <div className='w-full max-w-prose text-left sm:mx-auto sm:w-full '>
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
                        <p className='font-bold text-[40px]'>{"Let's go!"}</p>
                        <p className='text-sm'>
                            For students. By students. Finally.
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
                                    Sign in with {provider.name}
                                </FlatButton>
                            </div>
                        ))}
                </div>
            </div>
        </div>
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
