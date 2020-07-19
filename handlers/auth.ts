import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import * as db from '../models';

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await db.User.findOne({ email: req.body.email }).exec();
    // if email found
    if (user) {
      const { _id, email } = user;
      const isMatch = await user.comparePassword(req.body.password);
      // if password is correct
      if (isMatch) {
        const token = jwt.sign(
          {
            _id,
            email,
          },
          process.env.SECRET_KEY!,
        );
        return res.status(200).json({
          _id,
          token,
        });
      }
    }
    return res.status(400).send({ message: 'Invalid email or password' });
  } catch (err) {
    return next();
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  console.log('Signup body: ', req.body);
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const user = await db.User.create(newUser);
    const { _id, email } = user;
    const token = jwt.sign(
      {
        _id,
        email,
      },
      process.env.SECRET_KEY!,
    );
    return res.status(200).json({
      _id,
      token,
    });
  } catch (err) {
    return next();
  }
}
