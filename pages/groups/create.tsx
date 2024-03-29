import { CheckboxOld } from 'components/general/Checkbox'
import FlatButton from 'components/general/FlatButton'
import { postReactQuery } from 'hooks/useGroups'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react'
import type { Group, GroupCreate, Tags } from 'types/groups'

const CreateGroup = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [groupName, setGroupName] = useState('')
    const [description, setDescription] = useState('')
    const [school, setSchool] = useState('')
    const [course, setCourse] = useState('')
    const [goal, setGoal] = useState<string[]>([])
    const [maxMembers, setMaxMembers] = useState(12)
    const [isPrivate, setIsPrivate] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [createdGroupId, setCreatedGroupId] = useState<string | null>(null)

    const searchMutate = useMutation(
        (object: Tags) => postReactQuery('/api/groups/search', object),
        {
            onSuccess: (result: Group[]) => {
                searchMutate.data = result
            },
        }
    )

    const createMutate = useMutation(
        (object: GroupCreate) => postReactQuery('/api/groups/create', object),
        {
            onSuccess: (result: { groupId: string }) => {
                setCreatedGroupId(result.groupId)
                setGroupName('')
                setDescription('')
                setSchool('')
                setCourse('')
                setGoal([])
                setMaxMembers(12)
                setIsPrivate(false)
                setErrorText('')
            },
        }
    )

    useEffect(() => {
        if (createdGroupId) {
            console.log('created, group id: ', createdGroupId)
            router.push(`/groups/${createdGroupId}`)
        }
    }, [createdGroupId, router])

    const schoolTags = [
        'Oslo Met',
        'Høyskolen Kristiania',
        'Handelshøyskolen BI',
    ]
    const courseTags = [
        'Bedriftsøkonomi',
        'Digital markedsføring',
        'Programmering',
        'Marked, samfunn og globalisering',
    ]
    const goalTags = [
        'Bestått',
        'A',
        'B',
        'C',
        'D',
        'E',
        'Stille spørsmål',
        'Hjelpe andre',
        'Studere sammen',
        'Ha det gøy',
        'Øve til eksamen',
    ]

    const selectMembersAmount = () => {
        let maxMem: JSX.Element[] = []
        for (let i = 3; i < 12; i++) {
            maxMem.push(
                <option key={i} value={i + 1}>
                    {i + 1}
                </option>
            )
        }
        return maxMem
    }

    //make sure every field is filled when creating group
    const isValid = useCallback(() => {
        if (groupName.length === 0) {
            setErrorText('Gruppenavn er ikke fylt ut')
            return false
        }
        if (description.length === 0) {
            setErrorText('Beskrivelse er ikke fylt ut')
            return false
        }
        if (school.length === 0) {
            setErrorText('Skole er påkrevd')
            return false
        }
        if (course.length === 0) {
            setErrorText('Fag er påkrevd')
            return false
        }
        if (goal.length === 0) {
            setErrorText('Mål er påkrevd')
            return false
        }
        setErrorText('')
        return true
    }, [
        groupName.length,
        description.length,
        school.length,
        course.length,
        goal.length,
    ])

    //create a group
    const handleSubmitGroup = async (e: MouseEvent) => {
        e.preventDefault()
        if (!isValid()) return
        if (!session) return

        const admin = {
            userId: session.user.id as string,
            userName: session.user.name as string,
        }
        //properties of the group
        const GroupToSubmit: GroupCreate = {
            groupName,
            description,
            private: isPrivate,
            admin,
            members: [
                {
                    userId: session.user.id as string,
                    userName: session.user.name as string,
                    picture: session.user.image as string,
                },
            ],
            maxMembers,
            pendingMembers: [],
            tags: {
                school,
                course,
                goals: goal,
            },
        }
        createMutate.mutateAsync(GroupToSubmit)
    }
    const TagButton = (
        tag: string,
        state: string,
        setState: Dispatch<SetStateAction<string>>
    ) => {
        return (
            <button
                key={tag}
                className={
                    (state === tag ? 'bg-purple-1 text-white ' : 'bg-white') +
                    ' px-4 py-2 rounded border'
                }
                onClick={() => setState(tag)}>
                {tag}
            </button>
        )
    }

    const selectOption = (tag: string) => {
        return (
            <option key={tag} value={tag} className=' p-2'>
                {tag}
            </option>
        )
    }

    return (
        <>
            <Head>
                <title>Kollokviegrupper - Lag ny</title>
            </Head>
            <div className='bg-white py-4 px-6 flex gap-2'>
                <div
                    className='cursor-pointer hover:text-purple-500'
                    onClick={() => router.push('/groups')}>
                    Kollokviegrupper
                </div>
                {' / '}
                <div className='cursor-pointer hover:text-purple-500'>
                    Lag ny Gruppe
                </div>
            </div>

            <div className='flex flex-col w-full gap-2 bg-dark-1'>
                <div className='flex flex-row gap-2 px-6 py-12 items-center'>
                    <h1 className='text-2xl text-white'>Lag ny gruppe</h1>
                    <div className='px-3 bg-dark-6 h-fit rounded-full'>
                        Beta
                    </div>
                </div>
            </div>

            <div className='grid h-full min-h-screen grid-cols-1 bg-dark-6 p-4 lg:grid-cols-4'>
                <div className='flex flex-col col-span-1 gap-2 p-4 lg:col-span-3 bg-white border border-purple-4 rounded-lg h-fit max-w-5xl shadow shadow-purple-4'>
                    <div className='group flex border rounded outline-purple-2 focus-within:outline focus-within:outline-2 pr-4 items-center '>
                        <input
                            className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                            type={'text'}
                            maxLength={30}
                            value={groupName}
                            onChange={(e) => {
                                setGroupName(e.target.value)
                                console.log(groupName)
                            }}
                            placeholder='Skriv inn gruppenavn (maks 30 tegn)'
                        />
                        <p className='text-dark-3'>{30 - groupName.length}</p>
                    </div>
                    <div className='group flex border rounded outline-purple-2 focus-within:outline focus-within:outline-2 pr-4 items-center'>
                        <input
                            className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                            type={'text'}
                            maxLength={100}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Beskrivelse (maks 80 tegn)'
                        />
                        <p className='text-dark-3'>
                            {100 - description.length}
                        </p>
                    </div>
                    <CheckboxOld
                        value={isPrivate}
                        id={undefined}
                        name={'Privat'}
                        className={undefined}
                        onClick={(e: ChangeEvent<HTMLInputElement>) =>
                            setIsPrivate(e.target.checked)
                        }></CheckboxOld>
                    <div className='flex gap-2 items-center'>
                        <div>Maks medlemmer</div>
                        <select
                            className='py-2 px-4 rounded border'
                            defaultValue={12}
                            onChange={(e) =>
                                setMaxMembers(Number(e.target.value))
                            }>
                            {selectMembersAmount()}
                        </select>
                    </div>
                    <h1>Skole</h1>
                    <select
                        className='group w-fit border border-purple-3 rounded p-2 '
                        value={school ? school : 'default'}
                        onChange={(e) => setSchool(e.target.value)}>
                        <option
                            className='group-focus:hidden'
                            value={'default'}
                            disabled>
                            Velg en skole
                        </option>
                        {schoolTags.map((tag) => selectOption(tag))}
                    </select>
                    <h1>Populære institusjoner</h1>
                    <div className='flex flex-wrap lg:flex-row'>
                        {schoolTags.map((tag) => (
                            <div className='mr-2 mb-2' key={tag}>
                                {TagButton(tag, school, setSchool)}
                            </div>
                        ))}
                    </div>
                    <h1>Fag</h1>
                    <select
                        className='group w-fit border border-purple-3 rounded p-2 '
                        value={course ? course : 'course'}
                        onChange={(e) => setCourse(e.target.value)}>
                        <option
                            className='group-focus:hidden'
                            value={'course'}
                            disabled>
                            Velg ett fag
                        </option>
                        {courseTags.map((tag) => selectOption(tag))}
                    </select>
                    <h1>Mål (kan velge fler)</h1>
                    <div className='flex flex-wrap h-fit gap-2'>
                        {goalTags.map((tag) => (
                            <button
                                key={tag}
                                className={
                                    (goal.includes(tag)
                                        ? 'bg-purple-1 text-white '
                                        : 'bg-white') +
                                    ' px-4 py-2 rounded border'
                                }
                                onClick={() => {
                                    setGoal(
                                        goal.includes(tag)
                                            ? goal.filter((t) => t !== tag)
                                            : [...goal, tag]
                                    )
                                }}>
                                {tag}
                            </button>
                        ))}
                    </div>
                    <FlatButton
                        as='button'
                        className='h-fit disabled:bg-dark-4 disabled:hover:bg-dark-4'
                        disabled={
                            createMutate.isLoading || createMutate.isSuccess
                        }
                        onClick={(e) => {
                            !createMutate.isLoading && handleSubmitGroup(e)
                        }}>
                        Lag gruppe
                    </FlatButton>
                    {errorText && <div>{errorText}</div>}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session,
        },
    }
}

export default CreateGroup
