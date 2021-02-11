import * as express from 'express';
import { UserModel } from '../models';
import * as db from '../handlers/helpers';

const router = express.Router();

// get
router.get('/test', db.test());
router.get('/', db.getAll(UserModel));
router.get('/:id/posts', UserModel.getUsersPosts);
router.get('/:id/following/posts', UserModel.getOwnAndOthersPosts);
router.get('/:id', db.getById(UserModel));
router.get('/following/:id', UserModel.getFollowing);
router.get('/followers/:id', UserModel.getFollowers);
router.get('/followingandfollowers/:id', UserModel.getFollowingAndFollowers);
router.get('/term/:term', UserModel.getFilteredUsers);

// post
router.post('/', db.create(UserModel));

// put
router.put('/:id', db.update(UserModel));

// delete
router.delete('/:_id', db.deleteById(UserModel));

export default router;
