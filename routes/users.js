const express = require('express');
const router = express.Router();
const { User } = require('../models');
const db = require('../handlers/helpers');
const handlers = require('../handlers/users');

router.get('/exists-user', handlers.validateUsername());
router.get('/', db.getAll(User));
router.get('/:id/posts', handlers.getUsersPosts());
router.get('/:id', db.getById(User));
router.delete('/:_id', db.deleteById(User));

module.exports = router;
