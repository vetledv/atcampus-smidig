import BigCheckbox from 'components/general/BigCheckbox'
import { useState } from 'react'

const SelectPreferances = ({ selectedPreferances, setSelectedPreferances }) => {
    const preferances = [
        'Stille spørsmål',
        'Hjelpe andre',
        'Studere sammen',
        'Øve til Eksamen',
        'Ha det gøy',
    ]

    const handleClick = (e: { target: { value: any } }) => {
        if (!selectedPreferances.includes(e.target.value)) {
            setSelectedPreferances([...selectedPreferances, e.target.value])
        } else {
            setSelectedPreferances(
                selectedPreferances.filter((preferance: any) => {
                    return preferance !== e.target.value
                })
            )
        }
    }

    return (
        <section>
            <h3>Hva er viktig for deg?</h3>
            <div className='flex flex-wrap'>
                {preferances.map((preferance) => (
                    <BigCheckbox
                        value={preferance}
                        key={preferance}
                        name={preferance}
                        id={preferance}
                        className='m-1'
                        onClick={handleClick}
                    />
                ))}
            </div>
        </section>
    )
}

export default SelectPreferances
