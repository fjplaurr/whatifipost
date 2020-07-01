import * as express from 'express';
const router = express.Router();
import { User } from '../models';
import * as db from '../handlers/helpers'

// get
router.get('/exists-user', User.validateUsername());
router.get('/', db.getAll(User));
router.get('/:id/posts', User.getUsersPosts());
router.get('/:id', db.getById(User));

// post
router.post('/', db.create(User));

// put
router.put('/:id', db.update(User));

// delete
router.delete('/:_id', db.deleteById(User));

export default router;
