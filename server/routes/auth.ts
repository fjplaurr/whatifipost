import * as express from 'express';
import { signup, signin } from '../services/auth';

const router = express.Router();

// post
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
