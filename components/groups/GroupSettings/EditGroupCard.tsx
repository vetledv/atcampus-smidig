import FlatButton from 'components/buttons/FlatButton'
import GradientButton from 'components/buttons/GradientButton'
import TextInputField from 'components/general/TextInputField'
import { useState } from 'react'
import InputItem from './InputItem'

const EditTagCard = () => {
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [groupTotalMembers, setGroupTotalMembers] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(groupName, groupDescription, groupTotalMembers)
    }
    const deleteSubmit = (e) => {
        e.preventDefault()
        setGroupName('')
        setGroupDescription('')
        setGroupTotalMembers('')
        console.log(groupName, groupDescription, groupTotalMembers)
    }

    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-1 gap-2 '>
            <div className='flex flex-col bg-white rounded-standard py-2 px-8 w-80 h-96 drop-shadow'>
                <div className='  my-2 items-start'>
                    <h1 className='text-center text-md text-dark-1 font-semibold pb-2 '>
                        Gruppeinstillinger
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <InputItem
                            textFieldTitle={'Gruppenavn'}
                            name={groupName}
                            placeholder={groupName}
                            type={'text'}
                            setState={setGroupName}
                        />
                        <InputItem
                            textFieldTitle={'Beskrivelse'}
                            name={groupName}
                            placeholder={groupDescription}
                            type={'text'}
                            setState={setGroupDescription}
                        />
                        <InputItem
                            textFieldTitle={'Totalt antall medlemmer'}
                            name={groupName}
                            placeholder={groupTotalMembers}
                            type={'number'}
                            setState={setGroupTotalMembers}
                        />

                        <div className='my-2 items-center justify-center space-y-2 align-center grid grid-cols-1 w-[240px] py-2'>
                            <FlatButton onClick={handleSubmit}>
                                Oppdater
                            </FlatButton>
                            <FlatButton
                                onClick={deleteSubmit}
                                className='bg-red-600 hover:bg-red-500 focus:bg-red-500'>
                                Slett
                            </FlatButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTagCard
