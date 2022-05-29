import SubjectCard from '@/components/cards/SubjectCard'
import FlatButton from '@/components/general/FlatButton'
import { postReactQuery } from '@/hooks/useGroups'
import { Group, PaginatedGroups } from '@/types/groups'
import { ObjectId } from 'mongodb'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

const ChooseGroup = ({
    search,
    refetch,
}: {
    search: PaginatedGroups
    refetch: () => void
}) => {
    const session = useSession()
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [selectedGroup, setSelectedGroup] =
        useState<PaginatedGroups['groups'][0]>(null)

    //clicking modal
    const handleClick = (group: PaginatedGroups['groups'][0]) => {
        if (!mutate.isLoading) {
            if (!showModal) {
                setSelectedGroup(group)
                setShowModal(true)
                window.scrollTo(0, 0)
                console.log(mutate.data)
            } else {
                setSelectedGroup(null)
                setShowModal(false)
                mutate.reset()
            }
        }
    }

    //disable scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    const mutate = useMutation(
        (userInfo: any) => postReactQuery(`/api/testjoingroup`, userInfo),
        {
            onSuccess: (
                data: { message: string; private: boolean },
                variables
            ) => {
                mutate.data = data
                refetch()
            },
        }
    )

    const handleJoin = async (group: Group) => {
        mutate.mutateAsync({
            groupId: group._id,
            userId: session.data.user.id,
            userName: session.data.user.name,
            picture: session.data.user.image,
        })
    }

    //check if user in pendingMembers of group
    const isPending = (group: Group) => {
        if (group.pendingMembers) {
            return group.pendingMembers.some(
                (member) => member.userId.toString() === session.data.user.id
            )
        }
        return false
    }

    const renderModal = (group: PaginatedGroups['groups'][0]) => {
        return (
            <>
                <div className='absolute z-[999] top-0 bottom-0 left-0 right-0 m-auto p-4 w-fit h-fit bg-white rounded shadow flex flex-col gap-2'>
                    <h1>{group.groupName}</h1>
                    <p>{group.description}</p>

                    <div className='flex gap-2'>
                        <FlatButton
                            as='button'
                            onClick={() => handleClick(group)}>
                            Lukk
                        </FlatButton>
                        {mutate.data ? (
                            <>
                                {mutate.data?.private === true ? (
                                    <>
                                        <FlatButton
                                            as='button'
                                            onClick={() =>
                                                router.push('/groups')
                                            }>
                                            Gå til mine grupper
                                        </FlatButton>
                                    </>
                                ) : (
                                    <FlatButton
                                        as='button'
                                        onClick={() =>
                                            router.push(group._id.toString())
                                        }>
                                        Gå til gruppe
                                    </FlatButton>
                                )}
                            </>
                        ) : (
                            <FlatButton
                                as='button'
                                onClick={() => handleJoin(group)}>
                                {mutate.isLoading ? 'Loading...' : 'Bli med'}
                            </FlatButton>
                        )}
                    </div>

                    {mutate?.data?.private === true && (
                        <div>
                            <div>{mutate?.data?.message}</div>
                        </div>
                    )}
                    {mutate?.data?.private === false && (
                        <div>
                            <div>{mutate?.data?.message}</div>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => handleClick(group)}
                    className='bg-dark-1 w-full h-full absolute top-0 left-0 z-50 opacity-40'></div>
            </>
        )
    }

    return (
        <>
            {showModal && selectedGroup && renderModal(selectedGroup)}
            <div className='m-4 text-dark-1'>
                <div className='text-xl font-semibold'>
                    Trykk for å bli å bli tatt til en gruppe
                </div>
                <div className='text-sm'>
                    Noen grupper må gruppemedlemmer godkjennes
                </div>
            </div>
            <div className='w-fit grid grid-cols-1 lg:grid-cols-2'>
                {search?.groups?.map((group, i) => (
                    <li
                        key={group._id.toString()}
                        className={'my-4 mx-8 list-none'}>
                        {isPending(group) ? (
                            <>
                                {/*TODO: styling hvis du venter godkjenning/gruppen full */}
                                <SubjectCard
                                    groupName={group.groupName.toString()}
                                    groupId={group._id}
                                    compact={false}
                                    subjectCode={group.description}
                                    members={group.members.length}
                                    totalMembers={group.maxMembers}
                                    classNames={'cursor-default'}>
                                    Venter godkjenning
                                </SubjectCard>
                            </>
                        ) : (
                            <>
                                {group.members.length >= group.maxMembers ? (
                                    <>
                                        <SubjectCard
                                            groupName={group.groupName.toString()}
                                            groupId={group._id}
                                            compact={false}
                                            subjectCode={group.description}
                                            members={group.members.length}
                                            totalMembers={group.maxMembers}
                                            classNames={'cursor-default'}>
                                            Gruppen er full.
                                        </SubjectCard>
                                    </>
                                ) : (
                                    <SubjectCard
                                        groupName={group.groupName.toString()}
                                        groupId={group._id}
                                        compact={false}
                                        subjectCode={group.description}
                                        members={group.members.length}
                                        totalMembers={group.maxMembers}
                                        onClick={() => {
                                            handleClick(search.groups[i])
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </li>
                ))}
            </div>
        </>
    )
}

export default ChooseGroup
