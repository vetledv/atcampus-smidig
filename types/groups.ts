import { ObjectId } from 'mongodb'

export interface MessageMember {
    userId: string
    userName: string
}

export interface Member extends MessageMember {
    picture: string
}

export interface GroupAdmin extends MessageMember {}

export interface Group {
    _id: ObjectId
    groupName: string
    members: Member[]
    maxMembers: number
    tags: {
        school: string
        course: string
        goals: string[]
    }
    description: string
    private: boolean
    admin: GroupAdmin
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
