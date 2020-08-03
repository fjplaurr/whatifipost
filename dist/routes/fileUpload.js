"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fileUpload_1 = require("../services/fileUpload");
const router = express.Router();
const upload = fileUpload_1.default.single('image');
const singleUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return next(err);
        }
        const { file } = req;
        return res.status(200).json({ location: file.location });
    });
};
router.post('/', singleUpload);
exports.default = router;
//# sourceMappingURL=fileUpload.js.map