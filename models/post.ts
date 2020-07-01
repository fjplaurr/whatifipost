import * as mongoose from 'mongoose';
import { PostSchema } from '../interfaces';

const postSchema = new mongoose.Schema({
  text: String,
  date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<PostSchema>('Post', postSchema);
