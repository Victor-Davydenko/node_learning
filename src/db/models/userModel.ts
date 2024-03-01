import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String
});

export const UserModel =  mongoose.model('User', UserSchema);