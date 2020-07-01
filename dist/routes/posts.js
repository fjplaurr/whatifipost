"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var models_1 = require("../models");
var db = require("../handlers/helpers");
var router = express.Router();
// get
router.get('/', db.getAll(models_1.Post));
router.get('/:id', db.getById(models_1.Post));
// post
router.post('/', db.create(models_1.Post));
// put
router.put('/:id', db.update(models_1.Post));
// delete
router.delete('/:_id', db.deleteById(models_1.Post));
exports.default = router;
//# sourceMappingURL=posts.js.map