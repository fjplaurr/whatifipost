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
const mongoose = require("mongoose");
const bcrypt_1 = require("bcrypt");
const _1 = require(".");
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
    verificationCode: {
        type: String,
        required: true,
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    ],
});
userSchema.methods.comparePassword = function comparePassword(candidatePassword, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = yield bcrypt_1.compare(candidatePassword, this.password);
            return isMatch;
        }
        catch (err) {
            return next(err);
        }
    });
};
userSchema.statics.validateUsername = function validateUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exist = yield this.exists(req.query);
            if (exist) {
                return res.status(200).json({ message: 'The user does exist' });
            }
            return res.status(404).json({ message: 'The user does not exist' });
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.getUsersPosts = function getUsersPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const usersPost = yield _1.Post.find({ author: id }).sort('date');
            return res.status(200).json(usersPost);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.lol = function lol() {
    return __awaiter(this, void 0, void 0, function* () { return () => { console.log('lol'); }; });
};
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map