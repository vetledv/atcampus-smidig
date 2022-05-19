import BigCheckbox from "components/General/BigCheckbox"
import { useState } from "react"

const SelectPreferances = () => {
    const preferances = [
        'Stille spørsmål', 
        'Hjelpe andre', 
        'Studere sammen', 
        'Øve til Eksamen', 
        'Ha det gøy' 
    ]

  return (
    <section>
        <h3>Hva er viktig for deg?</h3>
        <div className="flex flex-wrap">
            {preferances.map((preferance) => (
                <BigCheckbox 
                    value={preferance}
                    key={preferance}
                    name={preferance}
                    id={preferance}
                    className='m-1'
                />
            ))}
        </div>
    </section>
  )
}

export default SelectPreferances