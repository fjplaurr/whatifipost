import PostSchema from './PostSchema';
import { Document } from 'mongoose';

interface UserSchema extends Document {
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

export default UserSchema;
