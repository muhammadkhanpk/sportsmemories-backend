import express from 'express';

import auth from './auth';

import stripe from './stripe';
import user from './user';


import { AuthenticateAuthToken, checkUserSession } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);
// router.use('/stripe', AuthenticateAuthToken, checkUserSession, stripe);
// router.use('/user', AuthenticateAuthToken, checkUserSession, user);

export default router;
