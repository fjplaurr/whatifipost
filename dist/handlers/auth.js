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
exports.signup = exports.signin = void 0;
const jwt = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const db = require("../models");
function signin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db.User.findOne({ email: req.body.email }).exec();
            // if email found
            if (user) {
                const { id, email } = user;
                const isMatch = yield user.comparePassword(req.body.password);
                // if password is correct
                if (isMatch) {
                    const token = jwt.sign({
                        id,
                        email,
                    }, process.env.SECRET_KEY);
                    return res.status(200).json({
                        user,
                        token,
                    });
                }
            }
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        catch (err) {
            return next();
        }
    });
}
exports.signin = signin;
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.hash(req.body.password, 10);
            const newUser = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
            const user = yield db.User.create(newUser);
            const token = jwt.sign({
                id: user.id,
                email: user.email,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (err) {
            return next();
        }
    });
}
exports.signup = signup;
//# sourceMappingURL=auth.js.map