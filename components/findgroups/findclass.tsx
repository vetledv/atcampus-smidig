import SubjectCardCompact from 'components/cards/SubjectCardCompact'

const FindClassPage = ({
    setSelectedSubject,
    selectedSubject,
}: {
    setSelectedSubject: (subject: string) => void
    selectedSubject: string
}) => {
    const classes = [
        {
            id: 1,
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Bedriftsøkonomi',
            classCode: '12333',
        },
        {
            id: 2,
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Digital markedsføring',
            classCode: '12444',
        },
        {
            id: 3,
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Programmering',
            classCode: '12555',
        },
        {
            id: 4,
            image: 'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg',
            className: 'Marked, samfunn og globalisering',
            classCode: '12666',
        },
    ]

    return (
        <div className='flex items-center justify-center'>
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:h-96 items-center lg:w-2/3'>
                {classes.map((subject) => (
                    <div key={subject.id} className='p-6 hover:cursor-default'>
                        <SubjectCardCompact
                            subjectCode={subject.classCode}
                            subjectImage={subject.image}
                            subjectName={subject.className}
                            subjectId={subject.id}
                            selected={selectedSubject === subject.className}
                            onClick={() => {
                                setSelectedSubject(subject.className)
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FindClassPage
