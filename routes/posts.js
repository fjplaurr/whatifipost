const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const db = require('../handlers/helpers');

router.get('/', db.getAll(Post));
router.get('/:id', db.getById(Post));
router.post('/', db.create(Post));
router.put('/:id', db.update(Post));
router.delete('/:id', db.deleteById(Post));

module.exports = router;
