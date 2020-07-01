import { Document } from 'mongoose';
import { UserSchema } from '.';

export interface PostSchema extends Document {
  _id: string,
  text: string,
  date: Date,
  author: UserSchema['id'],
}
