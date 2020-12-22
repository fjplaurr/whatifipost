import * as express from 'express';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import uploadS3 from '../services/fileUpload';

const router = express.Router();

// post
type fileType = { file: Express.Multer.File & { location?: string } };
const upload = uploadS3.single('image');
const singleUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err) {
      return next(err);
    }
    const { file }: fileType = req;
    return res.status(200).json({ location: file.location });
  });
};

router.post('/', singleUpload);

export default router;
