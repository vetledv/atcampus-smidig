import BigCheckbox from 'components/general/BigCheckbox'

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
            <div className='flex flex-wrap justify-center grid-cols-6'>
                {preferances.map((preferance) => (
                    <BigCheckbox
                        value={preferance}
                        selected={selectedPreferances}
                        key={preferance}
                        name={preferance}
                        id={preferance}
                        className='m-2 hover:transition-all duration-200 ease-in-out transform hover:scale-105'
                        onClick={handleClick}
                    />
                ))}
            </div>
        </section>
    )
}

export default SelectPreferances
