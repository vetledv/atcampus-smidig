import FlatButton from 'components/buttons/FlatButton'
import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = ({ providers }: { providers: GetServerSideProps }) => {
    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <div className='pb-8 -mt-8'>
                <Image
                    src={'/atcampus-full-logo.svg'}
                    width={208}
                    height={42}
                    alt='atcampus'
                />
            </div>
            <div className='flex flex-col justify-center items-center rounded-md p-8 bg-white'>
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
