"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../services/auth");
const router = express.Router();
// post
router.post('/signup', auth_1.signup);
router.post('/signin', auth_1.signin);
exports.default = router;
//# sourceMappingURL=auth.js.map