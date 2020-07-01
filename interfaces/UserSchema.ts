import { Document } from 'mongoose';
import { PostSchema } from '.';

export interface UserSchema extends Document {
  _id: string,
  email: string,
  password: string,
  profileImage: {
    name: string,
    size: number,
    mimetype: string,
    url: string,
  },
  nick: string,
  verificationCode: string,
  posts: PostSchema[],
}
