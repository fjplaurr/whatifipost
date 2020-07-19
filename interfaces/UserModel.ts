import { Model } from 'mongoose';
import { UserSchema } from '.';

export interface User extends UserSchema {
  comparePassword: (password: string) => boolean;
}
export interface UserModel extends Model<User> {
  validateUsername: () => any;
  getUsersPosts: () => any;
}
