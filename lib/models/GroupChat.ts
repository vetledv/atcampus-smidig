import mongoose from 'mongoose'

const GroupChatSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        memberIds: Array,
        memberNames: Array,
        messages: Array,
    },
    {
        timestamps: true,
        collection: 'group_chats',
    }
)
