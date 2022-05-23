import { ObjectId } from 'mongodb'

export interface Member {
    userId: string
    userName: string
    picture: string
}
export interface MessageMember {
    userId: string
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
    timestamp: Date
    from: MessageMember
    message: string
}

export interface SendMessage {
    userId: string
    userName: string
    message: string
    groupName: string
    groupId: ObjectId
}
