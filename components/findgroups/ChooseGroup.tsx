import SubjectCard from 'components/cards/SubjectCard'
import { ObjectId } from 'mongodb'
import React from 'react'
import { PaginatedGroups } from 'types/groups'

interface MutateResponse {
    message: string
    private: boolean
}

interface MutateError {
    error: {
        message: string
    }
    message: string
}

const ChooseGroup = ({ search }: { search: PaginatedGroups }) => {
    return (
        <>
            <div className='m-4 text-dark-1'>
                <div className='text-xl font-semibold'>
                    Trykk for å bli å bli tatt til en gruppe
                </div>
                <div className='text-sm'>
                    Noen grupper må gruppemedlemmer godkjennes
                </div>
            </div>
            <div className='w-fit grid grid-cols-1 lg:grid-cols-2'>
                {search?.groups?.map(
                    (group: {
                        groupName: React.Key
                        _id: ObjectId
                        description: string
                        members: string | any[]
                        maxMembers: number
                    }) => (
                        <li
                            key={group._id.toString()}
                            className={'my-4 mx-8 list-none'}>
                            <SubjectCard
                                groupName={group.groupName.toString()}
                                groupId={group._id}
                                groupImage={
                                    'https://image.shutterstock.com/image-vector/geography-open-book-hand-drawn-260nw-1782248465.jpg'
                                }
                                compact={false}
                                subjectCode={group.description}
                                members={group.members.length}
                                totalMembers={group.maxMembers}
                                classNames={'cursor-default'}
                            />
                        </li>
                    )
                )}
            </div>
        </>
    )
}

export default ChooseGroup
