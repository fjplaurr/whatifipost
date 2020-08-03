"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config_1 = require("../config");
aws.config.update({
    secretAccessKey: config_1.default.AWS_SECRET_ACCESS,
    accessKeyId: config_1.default.AWS_ACCESS_KEY,
    region: 'eu-west-3',
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
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
exports.default = uploadS3;
//# sourceMappingURL=fileUpload.js.map