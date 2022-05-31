import { useShowModal } from '@/hooks/useShowModal'
import { CogIcon } from '@heroicons/react/solid'
import FlatButton from 'components/general/FlatButton'
import { GroupMembers } from 'components/general/Lib'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Group } from 'types/groups'

const GroupHeader = ({
    group,
    activeMembers,
    leave,
    isAdmin,
    isInSettings,
}: {
    leave: () => void
    group: Group | null
    activeMembers: number
    isAdmin: boolean
    isInSettings?: boolean
}) => {
    const groupName = group?.groupName ?? 'Group Name'
    const [showModal, setShowModal] = useShowModal()
    const router = useRouter()

    const renderModal = () => {
        return (
            <>
                <div className='h-fit w-fit m-auto flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100]'>
                    <div className='flex p-6 w-full max-w-md h-full md:h-auto'>
                        <div className='flex flex-col bg-white rounded-lg shadow '>
                            <button
                                type='button'
                                className=' text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '>
                                <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fillRule='evenodd'
                                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                        clipRule='evenodd'></path>
                                </svg>
                            </button>
                            <div className='pb-4 px-6 text-center flex flex-col items-center'>
                                <svg
                                    className='mb-4 w-12 h-12 text-dark-3'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                                <h3 className='mb-5 text-lg font-normal text-gray-500 '>
                                    Er du sikker på at du vil forlate gruppen?
                                </h3>
                                <div className='flex justify-center gap-2'>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className='text-dark-3 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'>
                                        Nei, gå tilbake
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowModal(false)
                                            leave()
                                        }}
                                        className='text-white bg-purple-2 hover:bg-purple-1 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'>
                                        Ja, jeg er sikker
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        console.log('123')
                        setShowModal(false)
                    }}
                    className='bg-dark-1 w-full h-full fixed inset-0 z-50 opacity-40'></div>
            </>
        )
    }

    return (
        <div className={'h-48 min-w-96 bg-dark-1 text-white'}>
            <div className='flex justify-between h-full'>
                <div className='flex flex-col justify-center px-6'>
                    <div className={'text-2xl font-bold pb-3'}>{groupName}</div>
                    {activeMembers > 0 && (
                        <div className='flex flex-row items-center'>
                            <div>Medlemmer Aktive: {activeMembers} </div>{' '}
                            {<div className='text-xs'>🟢</div>}
                        </div>
                    )}

                    <GroupMembers
                        members={group?.members?.length}
                        totalMembers={group?.maxMembers}
                        color={'white'}
                    />
                </div>
                <div>
                    {isInSettings ? (
                        <div className='h-fit px-4 pt-6'>
                            <div
                                className='cursor-pointer px-4 py-2 rounded-lg bg-purple-2 hover:bg-purple-1'
                                onClick={() => {
                                    router.push(`/groups/${group._id}`)
                                }}>
                                Tilbake
                            </div>
                        </div>
                    ) : (
                        <>
                            {isAdmin ? (
                                <Link href={`/groups/${group._id}/settings`}>
                                    <CogIcon
                                        className={
                                            'w-9 h-9 text-purple-1 m-3 cursor-pointer'
                                        }
                                    />
                                </Link>
                            ) : (
                                <div className='h-full px-4 pt-6'>
                                    <FlatButton
                                        onClick={() => {
                                            setShowModal(true)
                                        }}
                                        className={
                                            'bg-slate-100 text-purple-1 hover:bg-purple-1 hover:text-white'
                                        }>
                                        {isAdmin
                                            ? 'Slett gruppe'
                                            : 'Forlat gruppe'}
                                    </FlatButton>
                                    {showModal && renderModal()}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GroupHeader
