import React from 'react'

const GroupTags = () => {
    const tags = [
        {
            id: 1,
            value: 'Programmering',
        },
        {
            id: 2,
            value: '5.Sem',
        },
        {
            id: 3,
            value: 'Bestå Eksamen',
        },
    ]
    return (
        <div className='text-dark-4 flex flex-wrap max-w-xs min-w-min bg-red-300'>
            {/*tag*/}
            {tags.map((tag) => (
                <div
                    key={tag.id}
                    className='flex w-fit px-2 border-2 border-dark-5 rounded-standard mr-1 my-2 '>
                    <h1 className='text-sm  font-semibold px-1 '>
                        {tag.value}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default GroupTags
