import Checkbox from "components/General/Checkbox"
import { useState } from "react"

const SelectGoal = () => {
    const goals = [
        {
            id: 1,
            value: 'Bestått'
        },
        {
            id: 2,
            value: 'A'
        },
        {
            id: 3,
            value: 'B'
        },
        {
            id: 4,
            value: 'C'
        },
        {
            id: 5,
            value: 'D'
        },
        {
            id: 6,
            value: 'E'
        },
        {
            id: 7,
            value: 'Stryk'
        },
    ]
  return (
    <section>
        <h3 className="mb-5">Hva ønsker du å oppnå?</h3>
        <div className="flex justify-center">
            {goals.map((goal) => (
                <Checkbox 
                    key={goal.id}
                    name={goal.value}
                    value={goal.value}
                    id={goal.id}
                    className=''
                />
            ))}
        </div>
        <div className='w-full border-b-2 border-solid border-dark-5 my-5 mx-auto'></div>
    </section>
  )
}

export default SelectGoal