import UserSchema from './UserSchema';
import { Document } from 'mongoose';

interface PostSchema extends Document {
  text: string,
  date: Date,
  author: UserSchema,
}

export default PostSchema;
