import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
    token: { required: true, type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Token', TokenSchema);
