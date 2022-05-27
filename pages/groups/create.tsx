import { CheckboxOld } from 'components/general/Checkbox'
import FlatButton from 'components/general/FlatButton'
import { postReactQuery } from 'hooks/useGroups'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { useMutation } from 'react-query'
import { Group, GroupAdmin, Member, Tags } from 'types/groups'

interface GroupSubmit {
    groupName: string
    members: Member[]
    maxMembers: number
    tags: {
        school: string
        course: string
        goals: string[]
    }
    description: string
    private: boolean
    admin: GroupAdmin | null
    pendingMembers: Member[]
}

const TestCreateGroup = () => {
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
                //queryClient.setQueryData('search', result)
                console.log('onSuccess', result)
                console.log('onSuccess', searchMutate.data)
                searchMutate.data = result
                console.log('onSuccess2', searchMutate.data)
            },
            onSettled: (result: Group[]) => {
                console.log('onSettled', result)
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
            maxMem.push(<option key={i} label={`${i + 1}`} value={i + 1} />)
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
    const handleSubmitGroup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isValid()) {
            //admin is the user who created the group
            const admin = {
                userId: session.user.id,
                userName: session.user.name,
            }
            //properties of the group
            const GroupToSubmit: GroupSubmit = {
                groupName,
                description,
                private: isPrivate,
                admin,
                members: [
                    {
                        userId: session.user.id,
                        userName: session.user.name,
                        picture: session.user.image,
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
            //send group to server
            await fetch(`/api/groups/create`, {
                method: 'POST',
                body: JSON.stringify(GroupToSubmit),
            }).then((r) => {
                r.json().then((res) => {
                    console.log(res)
                    //server returns the id of the group, set it to state
                    setCreatedGroupId(res.groupId)
                })
                console.log(r)
                //reset all states
                setGroupName('')
                setDescription('')
                setSchool('')
                setCourse('')
                setGoal([])
                setMaxMembers(12)
                setIsPrivate(false)
                setErrorText('')
            })
        }
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

    const schoolSelect = (tag: string) => {
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
            <div className='grid h-full min-h-screen grid-cols-1 bg-gray-50 p-4 lg:grid-cols-4'>
                <div className='flex flex-col col-span-1 gap-2 p-4 lg:col-span-3 bg-white border border-purple-4 rounded-lg h-fit max-w-5xl'>
                    <div className='group flex border rounded outline-purple-2 focus-within:outline focus-within:outline-2 pr-4 items-center'>
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
                            maxLength={80}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Beskrivelse (maks 80 tegn)'
                        />
                        <p className='text-dark-3'>{80 - description.length}</p>
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
                        className='w-fit border border-purple-3 rounded p-2 '
                        onChange={(e) => setSchool(e.target.value)}>
                        {schoolTags.map((tag) => schoolSelect(tag))}
                    </select>
                    <h1>Populære instutisjoner</h1>
                    {schoolTags.map((tag) => (
                        <div key={tag}>{TagButton(tag, school, setSchool)}</div>
                    ))}
                    <h1>Fag</h1>
                    {courseTags.map((tag) => (
                        <div key={tag}>{TagButton(tag, course, setCourse)}</div>
                    ))}
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
                        className='h-fit'
                        onClick={(e: FormEvent<HTMLFormElement>) => {
                            handleSubmitGroup(e)
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
    return
}

export default TestCreateGroup
