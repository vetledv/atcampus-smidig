import FlatButton from 'components/buttons/FlatButton'
import ChooseSchool from 'components/findgroups/ChooseSchool'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import React, { Key, useEffect, useState } from 'react'
import FindClassPage from '../components/findgroups/findclass'
import SelectGoals from '../components/findgroups/selectgoals'
import ChooseGroup from '../components/findgroups/ChooseGroup'

interface State {
    step: Number
    stepTitle: String
}

const FindGroupPage = () => {
    const [step, setStep] = useState(0)
    const [stepTitle, setStepTitle] = useState('Velg Skole')

    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedGoal, setSelectedGoal] = useState([])
    const [selectedPreferances, setSelectedPreferances] = useState([])

    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        setSelectedTags([
            selectedSchool,
            selectedSubject,
            selectedGoal,
            selectedPreferances,
        ])
    }, [selectedSchool, selectedSubject, selectedGoal, selectedPreferances])
    console.log('selected Tags: ' + selectedTags)

    const handleStep = () => {
        if (step === 0) {
            setStep(step + 1)
            setStepTitle('Velg Fag')
        }
        if (step === 1) {
            setStep(step + 1)
            setStepTitle('Velg Mål')
        }
    }

    const handleStepback = () => {
        if (step === 1) {
            setStep(0)
            setStepTitle('Velg Skole')
        }
        if (step === 2) {
            setStep(1)
            setStepTitle('Velg Fag')
        }
        if (step === 3) {
            setStep(2)
            setStepTitle('Velg Mål')
        }
    }

    const handleFindGroup = () => {
        if (step === 2) {
            setStep(step + 1)
            setStepTitle('Gruppeforslag')
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
                        {step === 0 && (
                            <ChooseSchool
                                setSelectedSchool={setSelectedSchool}
                            />
                        )}
                        {step === 1 && (
                            <FindClassPage
                                setSelectedSubject={setSelectedSubject}
                                selectedSubject={selectedSubject}
                            />
                        )}
                        {step === 2 && (
                            <SelectGoals
                                setSelectedGoal={setSelectedGoal}
                                selectedGoal={selectedGoal}
                                setSelectedPreferances={setSelectedPreferances}
                                selectedPreferences={selectedPreferances}
                            />
                        )}
                        {step === 3 && <ChooseGroup />}
                        <div className='p-10 m-6 flex flex-row-reverse justify-between'>
                            {step === 2 && (
                                <FlatButton onClick={handleFindGroup}>
                                    Finn Gruppe
                                </FlatButton>
                            )}
                            {step! < 2 && (
                                <FlatButton
                                    onClick={handleStep}
                                    className={
                                        'hover:transition-all hover:animate-bounce'
                                    }>
                                    Gå videre
                                </FlatButton>
                            )}
                            {step != 0 && (
                                <FlatButton
                                    className={'ml-6'}
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
