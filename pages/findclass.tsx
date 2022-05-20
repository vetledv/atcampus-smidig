import React, { useState } from 'react'
import FlatButton from 'components/buttons/FlatButton'
import FindGroupsHeaderTest from 'components/findgroups/FindGroupHeaderTest'
import SubjectCardCompact from 'components/cards/SubjectCardCompact'

const FindClassPage = () => {
    const [selectedSubject, setSelectedSubject] = useState('')
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

    console.log(selectedSubject)

    return (
        <div className='flex flex-wrap h-96'>
            {classes.map((subject) => (
                <div
                    key={subject.id}
                    className='p-8'
                    onClick={() => {
                        setSelectedSubject(''),
                            setSelectedSubject(subject.classCode)
                    }}>
                    <SubjectCardCompact
                        subjectCode={subject.classCode}
                        subjectImage={subject.image}
                        subjectName={subject.className}
                        subjectId={subject.id}
                        onClick={undefined}
                    />
                </div>
            ))}
        </div>
    )
}

export default FindClassPage
