import { Schema, model } from 'mongoose';



const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


export default model('Token', TokenSchema);