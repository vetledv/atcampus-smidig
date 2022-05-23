import FlatButton from 'components/buttons/FlatButton'
import Image from 'next/image'
import React from 'react'
import MemberCard from './MemberCard'

const MembersSettings = ({ members, admin }) => {
    return (
        <>
            <div className='flex flex-col bg-white rounded-standard py-2 px-8 w-80 h-96 drop-shadow justify-around'>
                <div>
                    <MemberCard members={members} admin={admin} />
                </div>

                <FlatButton>Forlat Gruppe</FlatButton>
            </div>
        </>
    )
}

export default MembersSettings
