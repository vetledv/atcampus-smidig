import { MailIcon } from '@heroicons/react/outline'
import FlatButton from 'components/buttons/FlatButton'
import GradientButton from 'components/buttons/GradientButton'
import SubjectCard from 'components/cards/SubjectCard'
import BigCheckbox from 'components/General/BigCheckbox'
import Checkbox from 'components/General/Checkbox'
import DropDown from 'components/General/DropDown'
import TextInputField from 'components/General/TextInputField'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(session)

    if (status === 'loading') {
        return <>Loading...</>
    }
    return <>dont add shit here</>
}
export default HomePage
