import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools/development'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import AppLayout from 'components/AppLayout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnMount: true,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    )
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default MyApp
