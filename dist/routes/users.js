"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const models_1 = require("../models");
const db = require("../handlers/helpers");
const router = express.Router();
// get
router.get('/exists-user', models_1.User.validateUsername);
router.get('/', db.getAll(models_1.User));
router.get('/:id/posts', models_1.User.getUsersPosts);
router.get('/:id', db.getById(models_1.User));
// post
router.post('/', db.create(models_1.User));
// put
router.put('/:id', db.update(models_1.User));
// delete
router.delete('/:_id', db.deleteById(models_1.User));
exports.default = router;
//# sourceMappingURL=users.js.map