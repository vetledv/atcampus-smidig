import { ObjectId } from 'mongodb'

export interface MessageMember {
    userId: string
    userName: string
}

export interface Member extends MessageMember {
    picture: string
}

export interface GroupAdmin extends MessageMember {}

export interface Tags {
    school: string
    course: string
    goals: string[]
}

export interface Group {
    _id: ObjectId
    groupName: string
    members: Member[]
    maxMembers: number
    tags: Tags
    description: string
    private: boolean
    admin: GroupAdmin
    pendingMembers: Member[]
}

export interface PaginatedGroups {
    groups: Group[]
    limit: number
    totalPages: number
    totalGroups: number
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

export interface AddOrRemoveMember {
    groupId: ObjectId
    admin: {
        userId: string
        userName: string
    }
    userToAdd: Member
    action: 'ADD' | 'REMOVE'
}
