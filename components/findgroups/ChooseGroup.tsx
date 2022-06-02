import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import SubjectCard from '@/components/cards/SubjectCard'
import FlatButton from '@/components/general/FlatButton'
import { postReactQuery } from '@/hooks/useGroups'
import { useShowModal } from '@/hooks/useShowModal'
import type { Group, PaginatedGroups } from '@/types/groups'

const ChooseGroup = ({
    search,
    refetch,
    selectedGoals,
}: {
    search: PaginatedGroups
    refetch: () => void
    selectedGoals: string[]
}) => {
    const session = useSession()
    const router = useRouter()
    const [showModal, setShowModal] = useShowModal()
    const [selectedGroup, setSelectedGroup] = useState<
        PaginatedGroups['groups'][0] | null
    >(null)

    //clicking modal
    const handleClick = (group: PaginatedGroups['groups'][0]) => {
        if (!mutate.isLoading) {
            if (!showModal) {
                setSelectedGroup(group)
                setShowModal(true)
                console.log(mutate.data)
            } else {
                setSelectedGroup(null)
                setShowModal(false)
                mutate.reset()
            }
        }
    }

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
            userId: session.data?.user.id,
            userName: session.data?.user.name,
            picture: session.data?.user.image,
        })
    }

    //check if user in pendingMembers of group
    const isPending = (group: Group) => {
        if (group.pendingMembers) {
            return group.pendingMembers.some(
                (member) => member.userId.toString() === session.data?.user.id
            )
        }
        return false
    }

    const renderModal = (group: PaginatedGroups['groups'][0]) => {
        return (
            <>
                <div className='fixed z-[999] p-4 flex flex-col w-fit h-fit inset-0 m-auto bg-white rounded shadow gap-2 text-dark-1'>
                    <button
                        type='button'
                        onClick={() => setShowModal(false)}
                        className='absolute -mt-4 p-2 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex items-center '>
                        {groupSvgs.exitModal}
                    </button>
                    <div className='flex h-fit gap-2 items-baseline'>
                        <p className='text-2xl font-semibold'>
                            {group.groupName}
                        </p>
                        <p className='italic mt-1'>
                            {group.private ? (
                                <div className='flex'>
                                    {groupSvgs.privateGroup}
                                    <p className=''>Privat gruppe</p>
                                </div>
                            ) : (
                                <div className='hidden'></div>
                            )}
                        </p>
                    </div>
                    <div>
                        {' '}
                        {/* Group description */}
                        <p className='font-medium'>Gruppebeskrivelse</p>
                        <div className='border border-dark-5 rounded-standard bg-purple-5'>
                            <p className='m-2'>{group.description}</p>
                        </div>
                    </div>
                    <div>
                        {' '}
                        {/* Group members */}
                        <div className='flex'>
                            <p className='font-medium mr-2'>Gruppemedlemmer</p>
                            <p>
                                {group.members.length} / {group.maxMembers}
                            </p>
                        </div>
                        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 border border-dark-5 rounded-standard bg-purple-5'>
                            {group.members.map((member) => (
                                <div
                                    key={member.userId}
                                    className={
                                        'flex items-center bg-purple-2 rounded-xl text-white m-1 cursor-default '
                                    }>
                                    <div className='px-2 mt-1'>
                                        <Image
                                            src={member.picture}
                                            alt={
                                                member.userName +
                                                'profile picture'
                                            }
                                            width={24}
                                            height={24}
                                            className={'rounded-xl'}
                                        />
                                    </div>
                                    <p className='pr-2'>{member.userName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-full'>
                        {' '}
                        {/* Group subjects */}
                        <p className='flex items-center'>
                            <p className='mr-2 font-medium'>Mål:</p>
                            <p className='mr-2 bg-purple-2 rounded-xl p-1 m-1 flex justify-center border border-dark-5 text-white cursor-default'>
                                Likt søk
                            </p>
                            <p className='rounded-xl p-1 m-1 flex justify-center border border-dark-5 cursor-default'>
                                Ulikt søk
                            </p>
                        </p>
                        <div className='border border-dark-5 rounded-standard bg-purple-5'>
                            <div className='m-1'>
                                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                                    {group.tags.goals.map((goal) => {
                                        let classes = ''
                                        if (
                                            selectedGoals
                                                .map((tag) => tag.toLowerCase())
                                                .includes(goal.toLowerCase())
                                        ) {
                                            classes = 'bg-purple-2 text-white'
                                        }
                                        return (
                                            <div key={goal.length}>
                                                <p
                                                    className={
                                                        classes +
                                                        ' ' +
                                                        'rounded-xl p-1 m-1 flex justify-center border border-dark-5 cursor-default whitespace-nowrap'
                                                    }>
                                                    {goal}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between'>
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
                    className='bg-dark-1 w-full h-full fixed inset-0 z-50 opacity-40'></div>
            </>
        )
    }

    return (
        <>
            {showModal && selectedGroup && renderModal(selectedGroup)}
            <div className='m-4 text-dark-1'>
                {search.groups.length > 0 ? (
                    <>
                        <div className='text-xl font-semibold'>
                            Trykk for å bli å bli tatt til en gruppe
                        </div>
                        <div className='text-sm'>
                            For private grupper må gruppemedlemmer godkjennes
                        </div>
                    </>
                ) : (
                    <>
                        <div className='text-xl font-semibold'>
                            Her var det ikke mye :(
                        </div>
                        <div className='text-sm flex gap-1'>
                            <p>
                                Vi fant ingen grupper med dine preferanser. Prøv
                                igjen eller
                            </p>
                            <p
                                onClick={() => router.push('/groups/create')}
                                className='font-semibold hover:text-purple-2 cursor-pointer'>
                                opprett en gruppe selv.
                            </p>
                        </div>
                    </>
                )}
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

const groupSvgs = {
    exitModal: (
        <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'></path>
        </svg>
    ),
    privateGroup: (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
        </svg>
    ),
    '3': '/static/svg/group-3.svg',
}
