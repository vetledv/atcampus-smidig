import React, { ChangeEvent, FormEvent } from 'react'
import { CheckboxOld } from './general/Checkbox'
import FlatButton from './general/FlatButton'

const CreateGroup = ({
    groupName,
    setGroupName,
    description,
    setDescription,
    isPrivate,
    setIsPrivate,
    setMaxMembers,
    selectMembersAmount,
    setSchool,
    schoolTags,
    schoolSelect,
    TagButton,
    school,
    courseTags,
    course,
    setCourse,
    goalTags,
    setGoal,
    goal,
    errorText,
    handleSubmitGroup,
}) => {
    return (
        <div className='grid h-full min-h-screen grid-cols-1 bg-dark-6 p-4 lg:grid-cols-4'>
            <div className='flex flex-col col-span-1 gap-2 p-4 lg:col-span-3 bg-white border border-purple-4 rounded-lg h-fit max-w-5xl shadow shadow-purple-4'>
                <div className='group flex border rounded outline-purple-2 focus-within:outline focus-within:outline-2 pr-4 items-center '>
                    <input
                        className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                        type={'text'}
                        maxLength={30}
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value)
                            console.log(groupName)
                        }}
                        placeholder='Skriv inn gruppenavn (maks 30 tegn)'
                    />
                    <p className='text-dark-3'>{30 - groupName.length}</p>
                </div>
                <div className='group flex border rounded outline-purple-2 focus-within:outline focus-within:outline-2 pr-4 items-center'>
                    <input
                        className='w-full rounded-lg px-4 py-2 border-0 focus:outline-none bg-transparent'
                        type={'text'}
                        maxLength={80}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Beskrivelse (maks 80 tegn)'
                    />
                    <p className='text-dark-3'>{80 - description.length}</p>
                </div>
                <CheckboxOld
                    value={isPrivate}
                    id={undefined}
                    name={'Privat'}
                    className={undefined}
                    onClick={(e: ChangeEvent<HTMLInputElement>) =>
                        setIsPrivate(e.target.checked)
                    }></CheckboxOld>
                <div className='flex gap-2 items-center'>
                    <div>Maks medlemmer</div>
                    <select
                        className='py-2 px-4 rounded border'
                        defaultValue={12}
                        onChange={(e) => setMaxMembers(Number(e.target.value))}>
                        {selectMembersAmount()}
                    </select>
                </div>
                <h1>Skole</h1>
                <select
                    className='w-fit border border-purple-3 rounded p-2 '
                    onChange={(e) => setSchool(e.target.value)}>
                    {schoolTags.map((tag) => schoolSelect(tag))}
                </select>
                <h1>Populære instutisjoner</h1>
                <div className='flex lg:flex-row'>
                    {schoolTags.map((tag) => (
                        <div className='mr-2 mb-2' key={tag}>
                            {TagButton(tag, school, setSchool)}
                        </div>
                    ))}
                </div>
                <h1>Fag</h1>
                <div className='flex md:flex-row md:flex-wrap flex-col'>
                    {courseTags.map((tag) => (
                        <div className='mr-2 mb-2' key={tag}>
                            {TagButton(tag, course, setCourse)}
                        </div>
                    ))}
                </div>
                <h1>Mål (kan velge fler)</h1>
                <div className='flex flex-wrap h-fit gap-2'>
                    {goalTags.map((tag) => (
                        <button
                            key={tag}
                            className={
                                (goal.includes(tag)
                                    ? 'bg-purple-1 text-white '
                                    : 'bg-white') + ' px-4 py-2 rounded border'
                            }
                            onClick={() => {
                                setGoal(
                                    goal.includes(tag)
                                        ? goal.filter((t) => t !== tag)
                                        : [...goal, tag]
                                )
                            }}>
                            {tag}
                        </button>
                    ))}
                </div>
                <FlatButton
                    className='h-fit'
                    onClick={(e: FormEvent<HTMLFormElement>) => {
                        handleSubmitGroup(e)
                    }}>
                    Lag gruppe
                </FlatButton>
                {errorText && <div>{errorText}</div>}
            </div>
        </div>
    )
}

export default CreateGroup
