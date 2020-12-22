import * as express from 'express';
import { PostModel } from '../models';
import * as db from '../handlers/helpers';

const router = express.Router();

// get
router.get('/', db.getAll(PostModel));
router.get('/:id', db.getById(PostModel));

// post
router.post('/', db.create(PostModel));

// put
router.put('/:id', db.update(PostModel));

// delete
router.delete('/:id', db.deleteById(PostModel));

export default router;
