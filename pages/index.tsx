import { MailIcon } from '@heroicons/react/outline'
import AppLayout from 'components/AppLayout'
import FlatButton from 'components/buttons/FlatButton'
import GradientButton from 'components/buttons/GradientButton'
import SubjectCard from 'components/cards/SubjectCard'
import SubjectCardCompact from 'components/cards/SubjectCardCompact'
import TextInputField from 'components/general/TextInputField'
import TopSearch from 'components/general/TopSearch'
import Header from 'components/navigation/Header'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Tabs from '../components/general/Tabs'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(session)

    if (status === 'loading') {
        return <>Loading...</>
    }
    return (
        <AppLayout>
            <Head>
                <title>atcampus components</title>
            </Head>
            <main className='m-4 w-full'>
                <Header />
                {status === 'unauthenticated' && (
                    <>
                        <div>Not signed in</div>
                        <FlatButton
                            as={'button'}
                            onClick={() => router.push('/auth/login')}>
                            Login
                        </FlatButton>
                    </>
                )}
                {status === 'authenticated' && (
                    <>
                        <div>Signed in as {session.user.email}</div>
                        <FlatButton as={'button'} onClick={() => signOut()}>
                            Sign out
                        </FlatButton>
                    </>
                )}

                <h1 className='text-xl lg:text-2xl'>atcampus components</h1>

                <TopSearch />
                <Tabs
                    tabTextOne={'Home'}
                    tabTextTwo={'Chat'}
                    tabTextThree={'Calender'}
                    underline={false}
                />

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>Flat Button</h2>

                    <FlatButton as={'button'}>Text goes here</FlatButton>
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>Text Input Field</h2>

                    <TextInputField
                        placeholder={'name@email.com'}
                        name='email'
                        type='email'
                        id={undefined}
                        value={undefined}
                        className={undefined}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>
                        Text Input Field with label
                    </h2>

                    <TextInputField
                        label={'Skriv inn e-post'}
                        placeholder={'name@email.com'}
                        name='email'
                        type='email'
                        id={undefined}
                        value={undefined}
                        className={undefined}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>
                        Text Input Field with icon
                    </h2>

                    <TextInputField
                        label={'Skriv inn e-post'}
                        placeholder={'name@email.com'}
                        name='email'
                        type='email'
                        icon={<MailIcon className='w-6 h-6 text-dark-2/70' />}
                        id={undefined}
                        value={undefined}
                        className={undefined}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>
                        Text Input Field with icon and button
                    </h2>

                    <TextInputField
                        label={'Skriv inn e-post'}
                        placeholder={'name@email.com'}
                        name='email'
                        type='email'
                        icon={<MailIcon className='w-7 h-7 text-dark-2/70' />}
                        button={
                            <GradientButton as={'button'}>
                                Text goes here
                            </GradientButton>
                        }
                        id={undefined}
                        value={undefined}
                        className={undefined}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>Card</h2>
                    <SubjectCardCompact
                        groupId={'fdskfsjd343q'}
                        groupImage={
                            'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                        }
                        groupName={'Matematikk'}
                        subjectCode={'PG2341'}
                    />
                    <div className='py-3'></div>

                    <SubjectCard
                        groupImage={
                            'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                        }
                        groupName={'Matematikk'}
                        subjectCode={'PG2341'}
                        members={7}
                        totalMembers={12}
                    />
                </div>

                <div className='mt-4'>
                    <p className='py-4 text-sm text-dark-1'>❤️</p>
                </div>
            </main>
        </AppLayout>
    )
}
export default HomePage
