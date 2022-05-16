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
        <div className='h-max  text-dark-4 grid grid-cols-2   '>
            {/*tag*/}
            {tags.map((tag) => (
                <div
                    key={tag.id}
                    className='flex items-center w-full border-2 border-dark-5 rounded-standard justify-center mr-1 my-2 text-center  '>
                    <h1 className='text-sm  font-semibold px-1 '>
                        {tag.value}
                    </h1>
                </div>
            ))}
        </div>
    )
}

export default GroupTags
