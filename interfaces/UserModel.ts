import { UserSchema } from './';
import { Model } from 'mongoose';

interface UserModel extends Model<UserSchema> {
  comparePassword: () => boolean;
  validateUsername: () => any;
  getUsersPosts: () => any;
}

export default UserModel;
