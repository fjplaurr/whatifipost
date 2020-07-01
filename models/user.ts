import * as mongoose from 'mongoose';
import { compare } from 'bcrypt';
import { Post } from './';
import { UserSchema, UserModel } from '../interfaces';
import {
  NextFunction,
  Request,
  Response
} from 'express';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    name: String,
    size: Number,
    mimetype: String,
    url: String,
  },
  nick: String,
  verificationCode: {
    type: String,
    required: true,
  },
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  ]
});

userSchema.methods.comparePassword = async function (candidatePassword: string, next: NextFunction) {
  try {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

userSchema.statics.validateUsername = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.exists(req.query, (err, result) => {
        if (err) {
          console.log('Error: ', err);
          return next({
            status: 400,
            message: err,
          });
        }
        return res.status(200).json({ message: 'The user does exist', result });
      });
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };
};

userSchema.statics.getUsersPosts = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const usersPost = await Post.find({ author: id }).sort('date');
      return res.status(200).json(usersPost);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }
}

const User = mongoose.model<UserSchema, UserModel>('User', userSchema);

export default User;
