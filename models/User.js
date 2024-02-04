import { Schema, model } from 'mongoose'


const UserSchema = new Schema({
    name: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    password: { required: true, type: String },
    isVerified: { type: Boolean, default: false },
    activationLink: { type: String }
});

export default model('User', UserSchema)