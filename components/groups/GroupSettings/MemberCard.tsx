import Image from 'next/image'
import React from 'react'

const MemberCard = () => {
    const members = [
        {
            id: 1,
            name: 'Magnus Soleim',
            type: 'Admin',
            image: 'https://image.shutterstock.com/image-vector/male-face-avatar-on-white-260nw-527840896.jpg',
        },
        {
            id: 2,
            name: 'Vetle DeVries',
            type: 'Member',
            image: 'https://image.shutterstock.com/image-vector/male-face-avatar-on-white-260nw-527840896.jpg',
        },
        {
            id: 3,
            name: 'Jonas Gahr',
            type: 'Member',
            image: 'https://image.shutterstock.com/image-vector/male-face-avatar-on-white-260nw-527840896.jpg',
        },
    ]

    return (
        <>
            {members.map((member) => (
                <div
                    key={member.id}
                    className={
                        'flex justify-between items-center text-white bg-purple-2 h-12 rounded-standard my-2 px-3'
                    }></div>
            ))}
        </>
    )
}

export default MemberCard
