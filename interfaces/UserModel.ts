import { Model } from 'mongoose';
import { UserSchema } from '.';

export interface User extends UserSchema {
  comparePassword: (password: string) => boolean;
}
export interface UserModel extends Model<User> {
  getUsersPosts: () => any;
  getFollowing: () => any;
  getFollowers: () => any;
  getOwnAndOthersPosts: () => any;
  getFilteredUsers: () => any;
}
