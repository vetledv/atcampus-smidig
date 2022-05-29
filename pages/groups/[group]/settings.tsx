import FlatButton from 'components/general/FlatButton'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import TopNav from 'components/groups/TopNav'
import { useGroup } from 'hooks/useGroups'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

interface MutateOptions {
    groupName?: string
    groupDescription?: string
    maxMembers?: number
}

const Settings = () => {
    const router = useRouter()
    const routerQuery = router.query

    const group = useGroup(routerQuery.group as string)
    const { data: session } = useSession()
    //check if admin
    const isAdmin = session?.user.id === group?.data?.admin?.userId

    const [newGroupName, setNewGroupName] = useState('')
    const [newGroupDescription, setNewGroupDescription] = useState('')
    const [newMaxMembers, setNewMaxMembers] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [confirmDeleteText, setConfirmDeleteText] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const [image, setImage] = useState(null)
    const [notImplementedError, setNotImplementedError] = useState<boolean>()

    const putFetch = async (object: MutateOptions) => {
        await fetch(`/api/groups/${routerQuery.group}`, {
            method: 'PUT',
            body: JSON.stringify(object),
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteFetch = async () => {
        await fetch(`/api/groups/${routerQuery.group}`, {
            method: 'DELETE',
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const changeGroupMutate = useMutation(
        (object: MutateOptions) => putFetch(object),
        {
            onSuccess: (result) => {
                group.refetch()
                //clear newGroupName and newGroupDescription
                setNewGroupName('')
                setNewGroupDescription('')
                setNewMaxMembers(group.data.maxMembers)
                setSuccessMessage('Gruppen ble endret!')
            },
        }
    )

    const deleteGroupMutate = useMutation(() => deleteFetch(), {
        onSuccess: (result) => {
            console.log(result)
            router.push('/groups')
        },
    })

    useEffect(() => {
        if (!showModal) return
        if (confirmDeleteText === group.data.groupName) {
            setConfirmDelete(true)
        } else {
            setConfirmDelete(false)
        }
    }, [confirmDeleteText, group.data?.groupName, showModal])

    const renderSelectOptions = () => {
        let maxMem: JSX.Element[] = []
        for (let i = group.data.members.length; i < 12; i++) {
            maxMem.push(
                <option key={i} value={i + 1} label={`${i + 1}`}></option>
            )
        }
        return maxMem
    }

    const handleChangeGroup = () => {
        const mutateObj: any = {}
        if (newGroupName !== '') {
            mutateObj.groupName = newGroupName
        }
        if (newGroupDescription !== '') {
            mutateObj.groupDescription = newGroupDescription
        }
        if (newMaxMembers !== group.data.maxMembers) {
            mutateObj.maxMembers = newMaxMembers
        }
        if (Object.keys(mutateObj).length === 0) {
            setShowModal(false)
            return
        } else {
            changeGroupMutate.mutateAsync(mutateObj as MutateOptions)
        }
    }
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setImage(e.target.result)
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const isSaveButtonDisabled = useCallback(() => {
        if (
            newGroupName === '' &&
            newGroupDescription === '' &&
            newMaxMembers === 0
        ) {
            return true
        }
        return false
    }, [newGroupName, newGroupDescription, newMaxMembers])

    const renderDeleteModal = () => {
        return (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999]'>
                    <div className='flex p-6 w-full max-w-md h-full md:h-auto'>
                        <div className='flex flex-col bg-white rounded-lg shadow '>
                            <button
                                type='button'
                                onClick={() => setShowModal(false)}
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
                            <div className='pb-4 px-6 text-center flex flex-col gap-4 items-center'>
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
                                <h3 className='text-lg font-normal text-gray-500 '>
                                    Er du sikker på at du vil slette gruppen?
                                </h3>
                                <h3>
                                    Vennligst skriv inn &quot;
                                    {group.data.groupName}&quot; for å slette
                                </h3>
                                <input
                                    onChange={(e) =>
                                        setConfirmDeleteText(e.target.value)
                                    }
                                    className='flex px-4 py-2 border w-full rounded-lg'></input>
                                <div className='flex justify-center gap-2'>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className='text-dark-3 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900'>
                                        Nei, gå tilbake
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowModal(false)
                                            deleteGroupMutate.mutateAsync()
                                        }}
                                        disabled={
                                            confirmDeleteText !==
                                            group.data.groupName
                                        }
                                        className={
                                            (confirmDelete
                                                ? 'bg-purple-2 hover:bg-purple-1 '
                                                : 'bg-dark-4 ') +
                                            '  text-white bg-purple-2 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                                        }>
                                        Ja, jeg er sikker
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-dark-1 w-full h-full absolute top-0 left-0 z-50 opacity-40'></div>
            </>
        )
    }

    if (!isAdmin) return <div>Unauthorized</div>
    if (group.isLoading) return <div>Loading...</div>
    if (group.isError) return <div>Error: {group.error?.message}</div>

    return (
        <>
            <Head>
                <title>{group.data?.groupName} - Innstillinger</title>
            </Head>

            <TopNav
                groupId={group.data._id.toString()}
                groupName={group.data.groupName}
                settings={true}
            />
            <GroupHeader
                leave={null}
                group={group.data}
                activeMembers={0}
                isAdmin={isAdmin}
                isInSettings={true}
            />
            {group.data && (
                <>
                    <div className='grid h-full grid-cols-1 p-4 lg:grid-cols-4 text-dark-1'>
                        <div className='flex flex-col col-span-1 p-4 gap-2 lg:col-span-3 bg-white border border-purple-4 rounded-lg h-fit max-w-5xl'>
                            <p className='text-lg font-semibold pb-2'>
                                Gruppeinnstillinger
                            </p>
                            <hr />
                            <p>Gruppenavn</p>
                            <div className='group flex border rounded focus-within:outline focus-within:outline-2 pr-4 items-center'>
                                <input
                                    className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                                    type={'text'}
                                    maxLength={30}
                                    placeholder={group.data.groupName}
                                    value={newGroupName}
                                    onChange={(e) => {
                                        setNewGroupName(e.target.value)
                                        if (successMessage !== '') {
                                            setSuccessMessage('')
                                        }
                                    }}
                                />
                                <p className='text-dark-3'>
                                    {30 - newGroupName.length}
                                </p>
                            </div>
                            <p>Gruppenavn</p>
                            <div className='group flex border rounded focus-within:outline focus-within:outline-2 pr-4 items-center'>
                                <input
                                    className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                                    type={'text'}
                                    maxLength={80}
                                    value={newGroupDescription}
                                    onChange={(e) => {
                                        setNewGroupDescription(e.target.value)
                                        if (successMessage !== '') {
                                            setSuccessMessage('')
                                        }
                                    }}
                                    placeholder={group.data.description}
                                />
                                <p className='text-dark-3'>
                                    {80 - newGroupDescription.length}
                                </p>
                            </div>
                            <p>Maks medlemmer</p>
                            <select
                                className='py-2 px-4 rounded border w-fit'
                                defaultValue={group.data.maxMembers}
                                onChange={(e) => {
                                    setNewMaxMembers(Number(e.target.value))
                                    if (successMessage !== '') {
                                        setSuccessMessage('')
                                    }
                                }}>
                                {renderSelectOptions()}
                            </select>

                            <h1>Gruppebilde</h1>
                            <form>
                                <input
                                    type={'file'}
                                    onChange={(e) => onImageChange(e)}></input>
                            </form>
                            {image !== null && (
                                <div className='flex flex-col gap-2 h-fit w-fit'>
                                    <div className=''>
                                        <Image
                                            src={image}
                                            alt=''
                                            width={200}
                                            height={200}></Image>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FlatButton
                                            className={'w-fit h-fit'}
                                            onClick={() => {
                                                setNotImplementedError(true)
                                            }}>
                                            Upload
                                        </FlatButton>

                                        {notImplementedError && (
                                            <div>
                                                Beklager, denne funksjonen er
                                                ikke implementert enda :)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {successMessage !== '' && <>{successMessage}</>}
                            <div className='flex flex-col justify-end items-end gap-2'>
                                <FlatButton
                                    as='button'
                                    disabled={isSaveButtonDisabled()}
                                    className={
                                        'min-w-fit w-52 disabled:bg-dark-4 disabled:cursor-default'
                                    }
                                    onClick={() => {
                                        if (!isSaveButtonDisabled()) {
                                            console.log(isSaveButtonDisabled())
                                            handleChangeGroup()
                                        }
                                    }}>
                                    Lagre endringer
                                </FlatButton>
                                <FlatButton
                                    as='button'
                                    className={
                                        'bg-red-500 hover:bg-red-800 min-w-fit w-52'
                                    }
                                    onClick={() => setShowModal(true)}>
                                    Slett gruppe
                                </FlatButton>
                            </div>
                        </div>
                        {showModal && renderDeleteModal()}
                    </div>
                </>
            )}
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

export default Settings
