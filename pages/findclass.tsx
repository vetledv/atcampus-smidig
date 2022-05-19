import React, { useState } from 'react'
import FlatButton from 'components/buttons/FlatButton'
import FindGroupsHeaderTest from 'components/findgroups/FindGroupHeaderTest'
import SubjectCardCompact from 'components/cards/SubjectCardCompact'

const FindClassPage = () => {
    const [classes, setSelectedClass] = useState([
        {
            id: '1',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'mattematikk',
            classCode: '1234',
        },
        {
            id: '2',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Prog',
            classCode: '1234',
        },
        {
            id: '3',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Ebiss',
            classCode: '1234',
        },
        {
            id: '4',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'mattematikk',
            classCode: '1234',
        },
        {
            id: '5',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Prog',
            classCode: '1234',
        },
        {
            id: '6',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Ebiss',
            classCode: '1234',
        },
    ])
    return (
        <div className='w-full'>
            <FindGroupsHeaderTest title='Velg Fag' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {classes.map((subject) => (
                    <div key={subject.id} className='p-2'>
                        <SubjectCardCompact
                            subjectCode={subject.classCode}
                            subjectImage={subject.image}
                            subjectName={subject.className}
                            subjectId={subject.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FindClassPage
