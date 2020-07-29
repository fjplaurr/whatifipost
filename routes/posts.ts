import * as express from 'express';
import { Post } from '../models';
import * as db from '../handlers/helpers';

const router = express.Router();

// get
router.get('/', db.getAll(Post));
router.get('/:id', db.getById(Post));

// post
router.post('/', db.create(Post));

// put
router.put('/:id', db.update(Post));

// delete
router.delete('/:id', db.deleteById(Post));

export default router;
