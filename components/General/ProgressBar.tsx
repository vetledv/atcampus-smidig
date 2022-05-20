import FindClassPage from 'pages/findclass'
import FindGroupPage from 'pages/findgroup'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import StepProgressBar from 'react-step-progress'
import 'react-step-progress/dist/index.css'

const ProgressBar = ({  }) => {
    const [step, setStep] = useState(0)
    const [stepOne, setStepOne] = useState(false)
    const [stepTwo, setStepTwo] = useState(false)
    const [stepThree, setStepThree] = useState(false)

    const step1Content = <></>
    const step2Content = <> </>
    const step3Content = <h1></h1>
    const step4Content = <h1></h1>

    // setup step validators, will be called before proceeding to the next step
    function step2Validator() {
        return true
    }

    function step3Validator() {
        return true
    }

    function step4Validator() {
        return true
    }

    function onFormSubmit() {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
    }

    return (
        <StepProgressBar
            startingStep={0}
            onSubmit={onFormSubmit}
            stepClass='p-5'
            primaryBtnClass='hidden'
            secondaryBtnClass='hidden'
            previousBtnName='Tilbake'
            nextBtnName='Neste'
            steps={[
                {
                    label: '',
                    name: 'step 1',
                    content: step1Content,
                },
                {
                    label: '',
                    name: 'step 2',
                    content: step2Content,
                    validator: step2Validator,
                },
                {
                    label: '',
                    name: 'step 3',
                    content: step3Content,
                    validator: step3Validator,
                },
                {
                    label: '',
                    name: 'step 4',
                    content: step4Content,
                    validator: step4Validator,
                },
            ]}
        />
    )
}

export default ProgressBar
