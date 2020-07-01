import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Model } from 'mongoose';

export const getAll = function (model: Model<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let document = await model.find({});
      return res.status(200).send(document);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

export const getById = function (model: Model<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let document = await model.findById(req.params.id);
      return res.status(200).send(document);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

export const create = function (model: Model<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let document = req.body;
      const newDocument = await new model(document).save();
      return res.status(200).send(newDocument);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      })
    }
  }
}

export const update = function (model: Model<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let document = req.body
      let updatedDocument = await model.findOneAndUpdate({ _id: req.params.id }, document);
      return res.status(200).send(updatedDocument);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

export const deleteById = function (model: Model<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const key = Object.keys(req.params)[0];
    try {
      let deletedDocument = await model.deleteOne({ [key]: req.params[key] });
      return res.status(200).send(deletedDocument);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      })
    }
  }
}
