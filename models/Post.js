import { Schema, model } from "mongoose";


const postSchema = new Schema({
    title: { type: String },
    description: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

});

export default model('Post', postSchema)