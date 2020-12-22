import { compare } from 'bcryptjs';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  prop, DocumentType, Ref, getModelForClass,
} from '@typegoose/typegoose';
import { Post } from '.';

class User {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public description?: string;

  @prop()
  public name?: string;

  @prop()
  public surname?: string;

  @prop()
  public profileImage?: string;

  @prop({ ref: () => User })
  public following?: Ref<User>[];

  @prop({ ref: () => User })
  public followers?: Ref<User>[];

  @prop({ ref: () => 'Post' })
  public posts?: Ref<Post>[];

  public async comparePassword(this: DocumentType<User>,
    candidatePassword: string, next: NextFunction) {
    try {
      const isMatch = await compare(candidatePassword, this.password);
      return isMatch;
    } catch (err) {
      return next(err);
    }
  }

  public static async getUsersPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const PostModel = getModelForClass(Post);
      const { id } = req.params;
      const usersPosts = PostModel.find({ author: id });
      const postsWithUser = await usersPosts.populate({
        path: 'author',
        model: 'User',
      }).sort({ date: -1 });
      return res.status(200).json(postsWithUser);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }

  public static async getOwnAndOthersPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const UserModel = getModelForClass(User);
      const PostModel = getModelForClass(Post);
      const { id } = req.params;
      const user = await UserModel.findById(id);
      let allUsers: User[] = [];
      allUsers = (user!.following?.map((followed) => followed) as User[]);
      // include the own user
      allUsers.push(user!);
      const posts = PostModel.find({ author: { $in: allUsers } });
      const postsWithUsers = await posts.populate({
        path: 'author',
        model: 'User',
      }).sort({ date: -1 });
      return res.status(200).json(postsWithUsers);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }

  // eslint-disable-next-line prefer-arrow-callback
  public static async getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
      const UserModel = getModelForClass(User);
      const { id } = req.params;
      const user = await UserModel.findById(id).populate({
        path: 'following.user',
      });
      return res.status(200).json(user?.following);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }

  // eslint-disable-next-line prefer-arrow-callback
  public static async getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
      const UserModel = getModelForClass(User);
      const { id } = req.params;
      const user = await UserModel.findById(id).populate({
        path: 'followers.user',
      });
      return res.status(200).json(user?.followers);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }

  // eslint-disable-next-line prefer-arrow-callback
  public static async getFilteredUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const UserModel = getModelForClass(User);
      const { term } = req.params;
      const regex = new RegExp(`${term}`, 'i');
      const conditions = { $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }] };
      const users = await UserModel.find(conditions);
      return res.status(200).json(users);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  }
}

const UserModel = getModelForClass(User);

export { User, UserModel };
