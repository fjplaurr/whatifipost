import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import config from '../config';

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: 'eu-west-3',
});

const s3 = new aws.S3();

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG are allowed'));
  }
};

const uploadS3 = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'backend-wetalk-app',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default uploadS3;
