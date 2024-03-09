import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  body: String,
  owner: { type: mongoose.Types.ObjectId, ref: "User" }
});

export const PostModel =  mongoose.model('Post', PostSchema);