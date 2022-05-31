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
import CreateGroup from 'components/CreateGroup'

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
            <CreateGroup
                groupName={groupName}
                setGroupName={setGroupName}
                description={description}
                setDescription={setDescription}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
                setMaxMembers={setMaxMembers}
                selectMembersAmount={selectMembersAmount}
                setSchool={setSchool}
                schoolTags={schoolTags}
                schoolSelect={schoolSelect}
                TagButton={TagButton}
                school={school}
                courseTags={courseTags}
                course={course}
                setCourse={setCourse}
                goalTags={goalTags}
                setGoal={setGoal}
                goal={goal}
                errorText={errorText}
                handleSubmitGroup={handleSubmitGroup}
            />
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

export default TestCreateGroup
