"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPhoto = exports.getPhoto = void 0;
const multer = require("multer");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const stream_1 = require("stream");
const models_1 = require("../models");
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fields: 3,
        fileSize: 15000000,
        files: 1,
    },
});
const getPhoto = (req, res) => {
    let photoID;
    try {
        photoID = new mongoose.Types.ObjectId(req.params.photoID);
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters' });
    }
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'photos',
    });
    const downloadStream = bucket.openDownloadStream(photoID);
    downloadStream.on('data', (chunk) => { res.write(chunk); });
    downloadStream.on('error', () => { res.sendStatus(404); });
    downloadStream.on('end', () => { res.end(); });
    return null;
};
exports.getPhoto = getPhoto;
const postPhoto = (req, res) => {
    upload.single('photo')(req, res, (err) => {
        const { fileName, userId } = req.body;
        if (err) {
            return res.status(400).json({ message: 'Upload Request Validation Failed' });
        }
        // Coverts buffer to Readable Stream and pushes null at the end to stop
        const readablePhotoStream = new stream_1.Readable();
        readablePhotoStream.push(req.file.buffer);
        readablePhotoStream.push(null);
        // Opens stream
        const bucket = new mongodb.GridFSBucket(mongoose.connection.db, {
            bucketName: 'photos',
        });
        const uploadStream = bucket.openUploadStream(fileName);
        readablePhotoStream.pipe(uploadStream);
        // Declares listeners on error and finish
        uploadStream.on('error', () => res.status(500).json({
            message: 'Error uploading file',
        }));
        uploadStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const userToModify = yield models_1.User.findById({ _id: userId });
            userToModify.profileImage = uploadStream.id;
            const userModified = yield models_1.User.findByIdAndUpdate(userId, userToModify);
            if (userModified) {
                return res.status(200).send(userModified);
            }
            res.status(201).json({
                message: `File uploaded successfully, stored under Mongo ObjectID: ${uploadStream.id}`,
            });
        }));
        return null;
    });
};
exports.postPhoto = postPhoto;
//# sourceMappingURL=uploads.js.map