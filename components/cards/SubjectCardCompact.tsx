import { useState } from 'react'
import Image from 'next/image'

const SubjectCardCompact = ({
    subjectImage,
    subjectName,
    subjectCode,
    subjectId,
    selected,
    onClick,
}) => {
    const classes =
        'flex p-3 input-shadow w-60 items-center rounded-standard text-white bg-purple-1'
    const [isSelectedSubject, isSetSelectedSubject] = useState(false)

    const handleSelection = () => {
        isSetSelectedSubject(!isSelectedSubject)
    }

    return (
        <>
            {' '}
            {/* <Link href={`/${subjectId}`}> */}
            <div
                //className={'flex p-3 input-shadow w-96 items-center bg-white rounded-standard text-dark-1 hover:bg-purple-4 hover:shadow-purple-4/50' }
                className={
                    selected
                        ? classes
                        : 'flex p-3 input-shadow w-60 items-center bg-white rounded-standard text-dark-1 hover:bg-purple-4 hover:shadow-purple-4/50'
                }
                onClick={onClick}>
                <Image src={subjectImage} width={64} height={64} alt='' />
                <div className={'px-6'}>
                    <div className='p-1'>
                        <div className={'text-lg font-semibold'}>
                            {subjectName}
                        </div>
                        <div className={'text-sm'}>{subjectCode}</div>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </>
    )
}

export default SubjectCardCompact
