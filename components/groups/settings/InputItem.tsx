import React from 'react'
import TextInputField from 'components/general/TextInputField'

const InputItem = ({ textFieldTitle, name, placeholder, setState, type }) => {
    return (
        <div className=' mt-1'>
            <h1 className='text-sm text-dark-1'>{textFieldTitle}</h1>
            <TextInputField
                onChange={(e) => setState(e.target.value)}
                type={type}
                disabled={false}
                placeholder={placeholder}
                id={undefined}
                value={undefined}
                className={undefined}
                name={name}
            />
        </div>
    )
}

export default InputItem
