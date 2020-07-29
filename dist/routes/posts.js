"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const models_1 = require("../models");
const db = require("../handlers/helpers");
const router = express.Router();
// get
router.get('/', db.getAll(models_1.Post));
router.get('/:id', db.getById(models_1.Post));
// post
router.post('/', db.create(models_1.Post));
// put
router.put('/:id', db.update(models_1.Post));
// delete
router.delete('/:id', db.deleteById(models_1.Post));
exports.default = router;
//# sourceMappingURL=posts.js.map