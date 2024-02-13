import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    avatar: {
        type: String,
        required: false,
        default: null
    },
});


export default model('User', UserSchema);