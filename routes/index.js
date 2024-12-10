import express from 'express';

import auth from './auth';
import event from './event';
import album from './album';
import group from './group';
import files from './files';
import tags from './tags';
import user from './user';
import feedbacks from './feedbacks';
import stripe from './stripe';
import message from './message';
import notification from './notification';
import checkin from './check-in';
import categories from './categories';

import { AuthenticateAuthToken, checkUserSession } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/event', AuthenticateAuthToken, event);
router.use('/album', AuthenticateAuthToken, album);
router.use('/group', AuthenticateAuthToken, group);
router.use('/file', AuthenticateAuthToken, files);
router.use('/tags', AuthenticateAuthToken, tags);
router.use('/user', AuthenticateAuthToken, user);
router.use('/feedback', AuthenticateAuthToken, feedbacks);
router.use('/message', AuthenticateAuthToken, message);
router.use('/notification', AuthenticateAuthToken, notification);
router.use('/checkin', AuthenticateAuthToken, checkin);
router.use('/stripe', stripe);
router.use('/category', categories);

export default router;
