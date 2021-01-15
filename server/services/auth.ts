import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import config from '../config';
import { UserModel } from '../models';

async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    // if email found
    if (user) {
      const { id, email } = user;
      const isMatch = await user.comparePassword(req.body.password, next);
      // if password is correct
      if (isMatch) {
        const token = jwt.sign(
          {
            id,
            email,
          },
          config.AUTHENTICATION_SECRET_KEY!,
        );
        return res.status(200).json({
          user,
          token,
        });
      }
    }
    return res.status(400).send({ message: 'Invalid email or password' });
  } catch (err) {
    return next(err);
  }
}

async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const user = await UserModel.create(newUser);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.AUTHENTICATION_SECRET_KEY!,
    );
    return res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.statusCode = 409;
    }
    return next(err);
  }
}

export { signup, signin };
