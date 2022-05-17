import { ObjectId } from 'mongodb'

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
    admin?: Member
    pendingMembers?: Member[] | []
}
