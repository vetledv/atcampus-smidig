import { CogIcon } from '@heroicons/react/solid'
import FlatButton from 'components/buttons/Button'
import { GroupMembers } from 'components/general/Lib'
import Link from 'next/link'
import { useState } from 'react'
import { Group } from 'types/groups'

const GroupHeader = ({
    group,
    activeMembers,
    leave,
}: {
    leave: () => void
    group: Group | null
    activeMembers: number
}) => {
    // for testing
    const membersAmount = group?.members?.length ?? 0
    const maxMembers = group?.maxMembers ?? 12
    const groupName = group?.groupName ?? 'Group Name'

    const [showModal, setShowModal] = useState(false)
    const renderModal = () => {
        return (
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
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
        )
    }

    return (
        <div className={'h-48 min-w-96 bg-dark-1 text-white'}>
            <div className='flex justify-between h-full'>
                <div className='flex flex-col justify-evenly px-6'>
                    <div className='pb-3'>
                        <div className={'text-2xl font-bold pb-3'}>
                            {groupName}
                        </div>
                        <FlatButton
                            onClick={() => setShowModal(true)}
                            className={
                                'bg-slate-100 text-purple-1 hover:bg-purple-1 hover:text-white cursor-default'
                            }>
                            Forlat Gruppe
                        </FlatButton>
                        {showModal && renderModal()}
                    </div>
                    <div className=''>
                        <div className='flex flex-row items-center'>
                            <div>Medlemmer Aktive: {activeMembers} </div>{' '}
                            {activeMembers > 0 && (
                                <div className='text-xs'>🟢</div>
                            )}
                        </div>
                        <GroupMembers
                            members={membersAmount}
                            totalMembers={maxMembers}
                            color={'white'}
                        />
                    </div>
                </div>
                <div>
                    <Link href={`/groups/${group._id}/settings`}>
                        <CogIcon
                            className={
                                'w-9 h-9 text-purple-1 m-3 cursor-pointer'
                            }
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GroupHeader
