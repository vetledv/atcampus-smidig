import FlatButton from 'components/buttons/FlatButton'
import ChooseSchool from 'components/findgroups/ChooseSchool'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import { postReactQuery } from 'hooks/useGroups'
import React, { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Group, Tags } from 'types/groups'
import ChooseGroup from '../components/findgroups/ChooseGroup'
import FindClassPage from '../components/findgroups/findclass'
import SelectGoals from '../components/findgroups/selectgoals'

interface State {
    step: Number
    stepTitle: String
}

const FindGroupPage = ({ selectedTagss }) => {
    const searchMutate = useMutation(
        (object: Tags) => postReactQuery('/api/groups/search', object),
        {
            onSuccess: (result: Group[]) => {
                //queryClient.setQueryData('search', result)
                console.log('onSuccess', result)
                console.log('onSuccess', searchMutate.data)
                searchMutate.data = result
                console.log('onSuccess2', searchMutate.data)
            },
            onSettled: (result: Group[]) => {
                console.log('onSettled', result)
            },
        }
    )

    //search data once searchMutate is successful
    const search = useQuery<Group[], Error>('search', () => searchMutate.data, {
        enabled: searchMutate.isSuccess,
    })

    const [step, setStep] = useState(0)
    const [stepTitle, setStepTitle] = useState('Velg Skole')

    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedGoal, setSelectedGoal] = useState([])
    const [selectedPreferances, setSelectedPreferances] = useState([])

    const [goalsTags, setGoalsTags] = useState([])

    useEffect(() => {
        setGoalsTags([selectedGoal, selectedPreferances])
    }, [selectedGoal, selectedPreferances])

    console.log('School:    ' + selectedSchool)
    console.log('Subject:    ' + selectedSubject)
    console.log('goals:    ' + goalsTags)

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

    //search for groups with tags
    const handleSearchForGroupByTags = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        if (step === 2) {
            setStep(step + 1)
            setStepTitle('Gruppeforslag')
        }
        e.preventDefault()
        const tags = {
            school: selectedSchool,
            course: selectedSubject,
            goals: goalsTags,
        }
        //send tags to server
        searchMutate.mutateAsync(tags)
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
                        {step === 3 && <ChooseGroup search={search} />}
                        <div className='p-10 m-6 flex flex-row-reverse justify-between'>
                            {step === 2 && (
                                <FlatButton
                                    onClick={(e: FormEvent<HTMLFormElement>) =>
                                        handleSearchForGroupByTags(e)
                                    }>
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
