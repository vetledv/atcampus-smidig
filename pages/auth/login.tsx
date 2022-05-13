import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }: { providers: GetServerSideProps }) => {
    return (
        <>
            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name} style={{ marginBottom: 0 }}>
                        <button
                            onClick={() =>
                                signIn(provider.id, {
                                    callbackUrl: `${window.location.origin}/`,
                                })
                            }>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
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
