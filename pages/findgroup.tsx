import FlatButton from 'components/buttons/FlatButton'
import ChooseSchool from 'components/findgroups/ChooseSchool'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import React, { useState } from 'react'
import StepProgressBar from 'react-step-progress'
import FindClassPage from '../components/findgroups/findclass'
import SelectGoals from '../components/findgroups/selectgoals'
import ChooseGroup from '../components/findgroups/ChooseGroup'
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
        if (step === 2) {
            setStep(step + 1)
            setStepTitle('Gruppeforslag')
            console.log(step)
        }
    }

    const handleStepback = () => {
        if (step === 1) {
            setStep(0)
            setStepTitle('Velg Skole')
            console.log(step)
        }
        if (step === 2) {
            setStep(1)
            setStepTitle('Velg Fag')
            console.log(step)
        }
        if (step === 3) {
            setStep(2)
            setStepTitle('Velg Mål')
            console.log(step)
        }
    }

    return (
        <>
            <div className='bg-dark-6 w-full'>
                <FindGroupsHeader
                    stepTitle={stepTitle}
                    step={step}
                    stepBack={handleStepback}
                    nextStep={handleStep}
                />
                <div className='flex justify-center'>
                    <div className='bg-white input-shadow h-full min-w-min max-w-7xl w-full my-16'>
                        {step === 0 && <ChooseSchool />}
                        {step === 1 && <FindClassPage />}
                        {step === 2 && <SelectGoals />}
                        {step === 3 && <ChooseGroup />}
                        <div className='p-16 flex flex-row-reverse justify-between'>
                            {step === 2 && (
                                <FlatButton onClick={handleStep}>
                                    Finn Gruppe
                                </FlatButton>
                            )}
                            {step! < 2 && (
                                <FlatButton onClick={handleStep}>
                                    Gå videre
                                </FlatButton>
                            )}
                            {step != 0 && (
                                <FlatButton
                                    className={'ml-8'}
                                    onClick={handleStepback}>
                                    Tilbake
                                </FlatButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindGroupPage
