import * as express from 'express';
const router = express.Router();
import { Post } from '../models';
import * as db from '../handlers/helpers'

// get
router.get('/', db.getAll(Post));
router.get('/:id', db.getById(Post));

// post
router.post('/', db.create(Post));

// put
router.put('/:id', db.update(Post));

// delete
router.delete('/:_id', db.deleteById(Post));

export default router;
