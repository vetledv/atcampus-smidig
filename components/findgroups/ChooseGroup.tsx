import SubjectCard from 'components/cards/SubjectCard'
import SubjectCardCompact from 'components/cards/SubjectCardCompact'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useGroups } from 'hooks/useGroups'
import FlatButton from 'components/buttons/FlatButton'
import { ObjectId } from 'mongodb'

const ChooseGroup = () => {
    const [selectedGroup, setSelectedGroup] = useState('')

    const groups = useGroups()

    if (groups.isLoading) {
        return <div>Loading...</div>
    }
    if (groups.isError) {
        return <div>Error: {groups.error.message}</div>
    }

    console.log(selectedGroup)

    return (
        <>
            <div className='m-4'>
                <div className='text-xl font-semibold'>
                    Trykk for å bli med i en gruppe
                </div>
                <div className='text-sm'>
                    Noen grupper må gruppemedlemmer godkjennes
                </div>
            </div>
            <div>
                {groups.data.map(
                    (group: {
                        groupName: React.Key
                        _id: ObjectId
                        description: string
                        members: string | any[]
                        maxMembers: number
                    }) => (
                        <li key={group._id} className={'m-8 list-none flex'}>
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
                            />
                        </li>
                    )
                )}
            </div>
        </>
    )
}

export default ChooseGroup
