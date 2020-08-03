import { Document } from 'mongoose';
import { PostSchema } from '.';

export interface UserSchema extends Document {
  _id: string,
  email: string,
  password: string,
  name: string,
  surname: string,
  profileImage: string,
  description: string,
  posts: PostSchema[],
  following: {
    user: UserSchema,
  }[],
  followers: {
    user: UserSchema,
  }[],
}
