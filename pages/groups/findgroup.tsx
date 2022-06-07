import { getSession } from 'next-auth/react'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import ChooseSchool from '@/components/findgroups/ChooseSchool'
import FindGroupsHeader from '@/components/findgroups/FindGroupsHeader'
import FlatButton from '@/components/general/FlatButton'
import RenderPaginationNav from '@/components/PaginationNav'
import { fetchReactQuery } from '@/hooks/useGroups'
import ChooseGroup from '@/../../components/findgroups/ChooseGroup'
import FindClassPage from '@/../../components/findgroups/findclass'
import SelectGoals from '@/../../components/findgroups/selectgoals'
import type { GetSessionParams } from 'next-auth/react'
import type { PaginatedGroups } from '@/types/groups'

const FindGroupPage = () => {
    const [page, setPage] = useState(1)
    const [step, setStep] = useState(0)

    const [selectedSchool, setSelectedSchool] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [goalsTags, setGoalsTags] = useState([])
    const [errorText, setErrorText] = useState('')

    const stepTitles = ['Velg Skole', 'Velg Fag', 'Velg Mål', 'Forslag']

    const search = useQuery<PaginatedGroups, Error>(
        ['search', page],
        fetchReactQuery(
            `groups/search?page=${page}&school=${selectedSchool}&subject=${selectedSubject}&goals=${goalsTags}`
        ),
        {
            enabled: step === 3,
        }
    )
    const refetch = useCallback(() => {
        search.refetch()
    }, [search])

    const hasNextPage = useMemo(() => {
        if (!search.data) {
            return false
        }
        return search.data.totalPages > page
    }, [search.data, page])

    const handleStep = () => {
        if (step === 0) {
            setErrorText('')
            if (selectedSchool !== '') {
                setStep(step + 1)
            } else {
                setErrorText('Du må velge en skole først!')
            }
        }
        if (step === 1) {
            setErrorText('')
            if (selectedSubject !== '') {
                setStep(step + 1)
            } else {
                setErrorText('Velg et fag først!')
            }
        }
        if (step === 2) {
            setErrorText('')
            if (goalsTags.length !== 0) {
                setStep(step + 1)
            } else {
                setErrorText('Velg minst ett mål!')
            }
        }
    }

    const handleStepback = () => {
        setErrorText('')
        if (step != 0) {
            //dont step back when already at step 0
            setStep(step - 1 || 0)
        }
    }

    if (search.isError) {
        return <div>Error</div>
    }

    return (
        <div className='bg-dark-6 w-full'>
            <FindGroupsHeader
                stepTitles={stepTitles}
                step={step}
                stepBack={handleStepback}
                nextStep={handleStep}
                setStep={setStep}
            />
            <div className='flex justify-center'>
                <div className='bg-white input-shadow h-full min-w-full max-w-7xl w-full my-16 p-4'>
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
                            {search.isLoading ? (
                                <div className='min-w-[400px]'>
                                    Laster inn...
                                </div>
                            ) : (
                                <>
                                    {search.data && (
                                        <>
                                            <ChooseGroup
                                                search={search.data}
                                                refetch={refetch}
                                                selectedGoals={goalsTags}
                                            />
                                            <RenderPaginationNav
                                                isPreviousData={
                                                    search.isPreviousData
                                                }
                                                hasNextPage={hasNextPage}
                                                data={search.data}
                                                page={page}
                                                setPage={setPage}
                                                limit={search.data!.limit}
                                            />
                                        </>
                                    )}
                                </>
                            )}
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
        props: {
            session,
        },
    }
}

export default FindGroupPage
