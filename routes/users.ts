import * as express from 'express';
import { User } from '../models';
import * as db from '../handlers/helpers';

const router = express.Router();

// get
router.get('/test', db.test());
router.get('/', db.getAll(User));
router.get('/:id/posts', User.getUsersPosts);
router.get('/:id/following/posts', User.getOwnAndOthersPosts);
router.get('/:id', db.getById(User));
router.get('/following/:id', User.getFollowing);
router.get('/followers/:id', User.getFollowers);
router.get('/term/:term', User.getFilteredUsers);

// post
router.post('/', db.create(User));

// put
router.put('/:id', db.update(User));

// delete
router.delete('/:id', db.deleteById(User));

export default router;
