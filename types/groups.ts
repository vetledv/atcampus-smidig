import { ObjectId, Timestamp } from 'mongodb'

export interface Member {
    userId: ObjectId
    userName: string
}

export interface Group {
    _id: ObjectId
    groupName: string
    members: Member[]
    maxMembers: number
    tags: string[]
    description: string
    private: boolean
    admin: Member | null
    pendingMembers: Member[]
}

export interface GroupMessages {
    _id: ObjectId
    groupId: ObjectId
    messages: Message[]
}

export interface Message {
    timestamp: Timestamp
    from: Member
    message: string
}
