import React, { useState } from 'react'
import SubjectCardCompact from 'components/cards/SubjectCardCompact'

const FindClassPage = (props) => {
    const [selectedSubject, setSelectedSubject] = useState('')

    const [classes, setSelectedClass] = useState([
        {
            id: '1',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'mattematikk',
            classCode: '12333',
        },
        {
            id: '2',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Prog',
            classCode: '12444',
        },
        {
            id: '3',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Ebiss',
            classCode: '12555',
        },
        {
            id: '4',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'mattematikk',
            classCode: '12666',
        },
        {
            id: '5',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Prog',
            classCode: '12777',
        },
        {
            id: '6',
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Ebiss',
            classCode: '1234',
        },
    ])

    const handleSelction = (props) => {
        // setSelectedSubject('')
        setSelectedSubject(props.classCode)
    }

    console.log(selectedSubject)

    return (
        <div>
            <div className='flex flex-wrap h-96'>
                {classes.map((subject) => (
                    <div key={subject.id} className='p-8 hover:cursor-default'>
                        <SubjectCardCompact
                            subjectCode={subject.classCode}
                            subjectImage={subject.image}
                            subjectName={subject.className}
                            subjectId={subject.id}
                            onClick={handleSelction}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FindClassPage
