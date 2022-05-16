import FlatButton from 'components/buttons/FlatButton'
import GradientButton from 'components/buttons/GradientButton'
import TextInputField from 'components/general/TextInputField'
import React, { useState } from 'react'

const EditTagCard = () => {
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [groupTotalMembers, setGroupTotalMembers] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(groupName, groupDescription, groupTotalMembers)
    }
    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-2 '>
            <div className='flex flex-col bg-white rounded-xl py-2 px-8 w-[340px] h-[370px] drop-shadow '>
                <div className='  my-2 items-start'>
                    <h1 className='text-center text-md text-dark-1 font-semibold pb-2 '>
                        Gruppeinstillinger
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className=' mt-1'>
                            <h1 className='text-sm text-dark-1'>Gruppenavn</h1>
                            <TextInputField
                                onChange={(e) => setGroupName(e.target.value)}
                                type={'text'}
                                disabled={false}
                                placeholder={groupName}
                                id={undefined}
                                value={undefined}
                                className={undefined}
                                name={'groupname'}
                            />
                        </div>

                        <div className=' mt-1'>
                            <h1 className='text-sm text-dark-1'>Beskrivelse</h1>
                            <TextInputField
                                onChange={(e) =>
                                    setGroupDescription(e.target.value)
                                }
                                type={'text'}
                                disabled={false}
                                placeholder={groupDescription}
                                id={undefined}
                                value={undefined}
                                className={undefined}
                                name={'description'}
                            />
                        </div>

                        <div className=' mt-1'>
                            <h1 className='text-sm text-dark-1'>
                                Maks antall medlemmer
                            </h1>

                            <TextInputField
                                onChange={(e) =>
                                    setGroupTotalMembers(e.target.value)
                                }
                                type={'number'}
                                disabled={false}
                                placeholder={groupTotalMembers}
                                id={undefined}
                                value={undefined}
                                className={undefined}
                                name={'groupname'}
                            />
                        </div>

                        <div className='my-2 items-center justify-center space-y-2 align-center grid grid-cols-1 w-[240px] py-2'>
                            <FlatButton
                                children={'Oppdater'}
                                onClick={handleSubmit}
                            />
                            <FlatButton children={'Slett'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTagCard
