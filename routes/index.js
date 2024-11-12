import express from 'express';

import auth from './auth';
import event from './event';
import album from './album';
import group from './group';
import files from './files';

import stripe from './stripe';
import user from './user';


import { AuthenticateAuthToken, checkUserSession } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/event', AuthenticateAuthToken, event);
router.use('/album', AuthenticateAuthToken, album);
router.use('/group', AuthenticateAuthToken, group);
router.use('/file', AuthenticateAuthToken, files);
// router.use('/stripe', AuthenticateAuthToken, checkUserSession, stripe);
// router.use('/user', AuthenticateAuthToken, checkUserSession, user);

export default router;
