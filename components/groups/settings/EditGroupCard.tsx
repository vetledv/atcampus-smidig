import FlatButton from 'components/buttons/FlatButton'
import { useState } from 'react'
import InputItem from './InputItem'

const EditTagCard = ({ groupName, groupDescription, groupMaxMembers }) => {
    const [stateName, setStateName] = useState(groupName)
    const [stateDescription, setStateDescription] = useState(groupDescription)
    const [stateMaxMembers, setStateMaxMembers] = useState(groupMaxMembers)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        console.log(groupName, groupDescription, groupMaxMembers)
    }
    const deleteSubmit = (e) => {
        e.preventDefault()
        setStateName('')
        setStateDescription('')
        setStateMaxMembers('')
        console.log(groupName, groupDescription, groupMaxMembers)
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
                            name={stateName}
                            placeholder={stateName}
                            type={'text'}
                            setState={setStateName}
                        />
                        <InputItem
                            textFieldTitle={'Beskrivelse'}
                            name={stateDescription}
                            placeholder={stateDescription}
                            type={'text'}
                            setState={setStateDescription}
                        />
                        <InputItem
                            textFieldTitle={'Totalt antall medlemmer'}
                            name={stateMaxMembers}
                            placeholder={stateMaxMembers}
                            type={'number'}
                            setState={setStateMaxMembers}
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
