import { Model } from 'mongoose';
import { UserSchema } from '.';

export interface UserModel extends Model<UserSchema> {
  comparePassword: () => boolean;
  validateUsername: () => any;
  getUsersPosts: () => any;
}
