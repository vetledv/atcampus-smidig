import ChooseSchool from 'components/findgroups/ChooseSchool'
import FindGroupsHeader from 'components/findgroups/FindGroupsHeader'
import FlatButton from 'components/general/FlatButton'
import RenderPaginationNav from 'components/PaginationNav'
import { fetchReactQuery } from 'hooks/useGroups'
import { getSession, GetSessionParams } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { PaginatedGroups } from 'types/groups'
import ChooseGroup from '../../components/findgroups/ChooseGroup'
import FindClassPage from '../../components/findgroups/findclass'
import SelectGoals from '../../components/findgroups/selectgoals'

const FindGroupPage = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)

    const [step, setStep] = useState(0)
    const [stepTitle, setStepTitle] = useState('Velg Skole')

    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [goalsTags, setGoalsTags] = useState([])
    const [errorText, setErrorText] = useState('')

    const search = useQuery<PaginatedGroups, Error>(
        ['search', page],
        fetchReactQuery(
            `groups/search?page=${page}&school=${selectedSchool}&subject=${selectedSubject}&goals=${goalsTags}`
        ),
        {
            enabled: step === 3,
        }
    )
    const hasNextPage = useMemo(
        () => search.data?.totalPages > page,
        [search.data, page]
    )

    const handleStep = () => {
        if (step === 0) {
            setErrorText('')
            if (selectedSchool !== '') {
                setStep(step + 1)
                setStepTitle('Velg Fag')
            } else {
                setErrorText('Du må velge en skole først!')
            }
        }
        if (step === 1) {
            setErrorText('')
            if (selectedSubject !== '') {
                setStep(step + 1)
                setStepTitle('Velg Mål')
            } else {
                setErrorText('Velg et fag først!')
            }
        }
        if (step === 2) {
            setErrorText('')
            if (goalsTags.length !== 0) {
                setStep(step + 1)
                setStepTitle('Gruppeforslag')
            } else {
                setErrorText('Velg minst ett mål!')
            }
        }
    }

    const handleStepback = () => {
        setErrorText('')
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

    if (search.isLoading) {
        return <div>Loading</div>
    }
    if (search.isError) {
        return <div>Error</div>
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
                    <div className='bg-white input-shadow h-full min-w-full max-w-7xl w-full my-16'>
                        {step === 0 && (
                            <ChooseSchool
                                setSelectedSchool={setSelectedSchool}
                                selectedSchool={selectedSchool}
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
                                setSelectedGoal={setGoalsTags}
                                selectedGoal={goalsTags}
                                setSelectedPreferances={setGoalsTags}
                                selectedPreferences={goalsTags}
                            />
                        )}
                        {step === 3 && (
                            <>
                                <ChooseGroup search={search.data} />
                                <RenderPaginationNav
                                    isPreviousData={search.isPreviousData}
                                    hasNextPage={hasNextPage}
                                    data={search.data}
                                    page={page}
                                    setPage={setPage}
                                    limit={search.data.limit}
                                />
                            </>
                        )}
                        <div className='m-6 flex flex-row-reverse justify-between'>
                            {step! < 3 && (
                                <div className='flex gap-4 items-center'>
                                    {errorText}
                                    <FlatButton
                                        as='button'
                                        onClick={handleStep}
                                        className={
                                            'hover:transition-all duration-200 ease-in-out transform hover:scale-110'
                                        }>
                                        Gå videre
                                    </FlatButton>
                                </div>
                            )}
                            {step != 0 && (
                                <FlatButton
                                    className={
                                        'ml-6 hover:transition-all duration-200 ease-in-out transform hover:scale-110'
                                    }
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

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default FindGroupPage
