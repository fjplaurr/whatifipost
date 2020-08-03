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
    description: String,
    name: String,
    surname: String,
    profileImage: String,
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    ],
    following: [
        {
            _id: false,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    followers: [
        {
            _id: false,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
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
userSchema.statics.getUsersPosts = function getUsersPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const usersPosts = _1.Post.find({ author: id });
            const postsWithUser = yield usersPosts.populate({
                path: 'author',
                model: 'User',
            });
            return res.status(200).json(postsWithUser);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.getPostsFromFollowedUsers = function getPostsFromFollowedUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield User.findById(id);
            const idsFollowedUsers = user === null || user === void 0 ? void 0 : user.following.map((followed) => followed.user);
            const posts = _1.Post.find({ author: { $in: idsFollowedUsers } });
            const postsWithUsers = yield posts.populate({
                path: 'author',
                model: 'User',
            });
            return res.status(200).json(postsWithUsers);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.getFollowing = function getFollowing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield User.findById(id).populate({
                path: 'following.user',
            });
            return res.status(200).json(user === null || user === void 0 ? void 0 : user.following);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.getFollowers = function getFollowers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield User.findById(id).populate({
                path: 'followers.user',
            });
            return res.status(200).json(user === null || user === void 0 ? void 0 : user.followers);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
userSchema.statics.getFilteredUsers = function getFilteredUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { term } = req.params;
            const regex = new RegExp(`${term}`, 'i');
            const conditions = { $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }] };
            const users = yield User.find(conditions);
            return res.status(200).json(users);
        }
        catch (err) {
            return next({
                status: 400,
                message: err.message,
            });
        }
    });
};
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map