import { MailIcon } from '@heroicons/react/outline'
import AppLayout from 'components/AppLayout'
import FlatButton from 'components/buttons/FlatButton'
import GradientButton from 'components/buttons/GradientButton'
import SubjectCard from 'components/cards/SubjectCard'
import TextInputField from 'components/general/TextInputField'
import TopSearch from 'components/general/TopSearch'
import Header from 'components/navigation/Header'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Tabs from '../components/general/Tabs'
import DropDown from 'components/general/DropDown'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import Footer from 'components/general/Footer'
import AddTag from 'components/groups/GroupSettings/AddTag'
import EditTagCard from 'components/groups/GroupSettings/EditGroupCard'
import Checkbox from 'components/General/Checkbox'
import BigCheckbox from 'components/General/BigCheckbox'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(session)

    const items = [
        {
            id: 1,
            value: 'Høyskolen Kristiania',
        },
        {
            id: 2,
            value: 'Oslo Met',
        },
        {
            id: 3,
            value: 'Handelshøyskolen BI',
        },
    ]

    if (status === 'loading') {
        return <>Loading...</>
    }
    return (
        <>
            <Head>
                <title>atcampus components</title>
            </Head>
            <main className='m-4 flex flex-col gap'>
                <div className='w-96'>
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
                </div>

                <h1 className='text-xl lg:text-2xl'>atcampus components</h1>

                <div className='mt-8 pb-12'>
                    <h2 className='text-lg lg:text-xl'>Drop Down</h2>
                    <DropDown items={items} dropDownTitle={'Instutisjoner'} />
                </div>

                <AddTag />
                <EditTagCard />

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>Flat Button</h2>

                    <FlatButton as={'button'}>Text goes here</FlatButton>
                </div>

                <div className='mt-8 w-96'>
                    <h2 className='text-lg lg:text-xl'>Text Input Field</h2>

                    <TextInputField
                        placeholder={'name@email.com'}
                        name='email'
                        type='email'
                        id={undefined}
                        value={undefined}
                        className={undefined}
                        onChange={undefined}
                    />
                </div>

                <div className='mt-8 w-96'>
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
                        onChange={undefined}
                    />
                </div>

                <div className='mt-8 w-96'>
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
                        onChange={undefined}
                    />
                </div>

                <div className='mt-8 w-96'>
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
                        onChange={undefined}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>Card</h2>
                    <SubjectCard
                        groupImage={
                            'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                        }
                        groupName={'Matematikk'}
                        subjectCode={'PG2341'}
                        compact={true}
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
                        compact={false}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl'>GroupHeader</h2>
                    <GroupHeader group={undefined} />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg lg:text-xl mb-1'>Checkboxes</h2>
                    <div className='flex'>
                        <div className='flex-1'>
                            <Checkbox 
                                value={undefined}
                                id={undefined}
                                name={'Bestått'}
                                className={undefined}
                            />
                        </div>
                        <div className='flex-1'>
                            <BigCheckbox 
                                value={undefined}
                                id={undefined}
                                name={'Stille Spørsmål'}
                                className={undefined}
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='py-4 text-sm text-dark-1'>❤️</p>
                </div>

            </main>
        </>
    )
}
export default HomePage
