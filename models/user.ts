import * as mongoose from 'mongoose';
import { compare } from 'bcrypt';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { Post } from '.';
import { UserSchema, UserModel } from '../interfaces';

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
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  ],
});

userSchema.methods.comparePassword = async function
comparePassword(candidatePassword: string, next: NextFunction) {
  try {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

userSchema.statics.validateUsername = async function
validateUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const exist: boolean = await this.exists(req.query);
    if (exist) {
      return res.status(200).json({ message: 'The user does exist' });
    }
    return res.status(404).json({ message: 'The user does not exist' });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

userSchema.statics.getUsersPosts = async function
getUsersPosts(req: Request, res: Response, next: NextFunction) {
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
};

const User = mongoose.model<UserSchema, UserModel>('User', userSchema);

export default User;
