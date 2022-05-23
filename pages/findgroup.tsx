import FlatButton from 'components/buttons/FlatButton'
import ChooseSchool from 'components/findgroups/ChooseSchool'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import React, { useState } from 'react'
import StepProgressBar from 'react-step-progress'
import FindClassPage from './findclass'
import SelectGoals from './selectgoals'
// Contents of this file will be moved. This page will serve the find group functionality.
// TODO: add steps to create a group

interface State {
    step: Number
    stepTitle: String
}
const FindGroupPage = () => {
    const [step, setStep] = useState(0)
    const [stepTitle, setStepTitle] = useState('Velg Skole')

    const handleStep = () => {
        //TODO: Handle last step
        if (step === 0) {
            setStep(step + 1)
            setStepTitle('Velg Fag')
            console.log(step)
        }
        if (step === 1) {
            setStep(step + 1)
            setStepTitle('Velg Mål')
            console.log(step)
        }
    }

    return (
        <>
            <div className='bg-dark-6 w-full'>
                <FindGroupsHeader stepTitle={stepTitle} />
                <div className='flex justify-center'>
                    <div className='bg-white input-shadow h-full min-w-min max-w-7xl w-full my-16'>
                        {step === 0 && <ChooseSchool />}
                        {
                            step === 1 && <FindClassPage /> //TODO: Add SelectSubject
                        }
                        {
                            step === 2 && <SelectGoals /> //TODO: Add SelectGoal
                        }
                        <div className='p-16'>
                            <FlatButton onClick={handleStep}>
                                Gå videre
                            </FlatButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindGroupPage
