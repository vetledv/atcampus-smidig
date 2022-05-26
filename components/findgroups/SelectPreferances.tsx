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

    const handleClick = (e) => {
        if (!selectedPreferances.includes(e.target.value)) {
            setSelectedPreferances([...selectedPreferances, e.target.value])
        } else {
            setSelectedPreferances(
                selectedPreferances.filter(
                    (preferance) => preferance !== e.target.value
                )
            )
        }
    }
    console.log(selectedPreferances)

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
