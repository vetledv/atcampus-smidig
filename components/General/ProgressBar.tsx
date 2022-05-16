import React from 'react'
import StepProgressBar from 'react-step-progress'
import 'react-step-progress/dist/index.css'

const ProgressBar = () => {
    const step1Content = <h1></h1>
    const step2Content = <h1></h1>
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
            wrapperClass=''
            progressClass=''
            stepClass=''
            labelClass=''
            buttonWrapperClass=''
            primaryBtnClass='text-white bg-gradient-to-r from-gradient-left to-gradient-right hover:shadow-md hover:shadow-purple-2/50 active:to-purple-1/70 border-none rounded-standard'
            secondaryBtnClass='text-white bg-gradient-to-r from-gradient-left to-gradient-right hover:shadow-md hover:shadow-purple-2/50 active:to-purple-1/70 border-none rounded-standard'
            previousBtnName=''
            nextBtnName=''
            steps={[
                {
                    label: 'Velg skole',
                    name: 'step 1',
                    content: step1Content,
                },
                {
                    label: 'Velg fag',
                    name: 'step 2',
                    content: step2Content,
                    validator: step2Validator,
                },
                {
                    label: 'Velg Mål',
                    name: 'step 3',
                    content: step3Content,
                    validator: step3Validator,
                },
                {
                    label: 'Forslag',
                    name: 'step 4',
                    content: step4Content,
                    validator: step4Validator,
                },
            ]}
        />
    )
}

export default ProgressBar
