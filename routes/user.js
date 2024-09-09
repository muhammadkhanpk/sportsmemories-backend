import express from 'express';

import User from '../models/user';

import {
  CancelUserSubscription,
  DeleteUser,
  GetKeepaKeys,
  GetUser,
  GetUsers,
  InviteUser,
  UpdateKeepaKeyTime,
  UpdateProfileInfo,
  UpdateUserPassword,
  KeepaKeyValidation,
  AddSubUser,
  GetSubUsers,
  GetReferralUsers,
  GetUserInvoices
} from '../controllers/users';

import { cancelledSubscription } from '../utils/email-templates';
import { SendEmail } from '../utils/send-email';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/cancel-user-subscription', async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      impersonateUserId,
      userId: bodyUserId
    } = req.body || {};

    let userId = _id;
    if (impersonateUserId) {
      userId = impersonateUserId;
    } else if (bodyUserId) {
      userId = bodyUserId;
    } else {
      userId = _id;
    }

    await CancelUserSubscription({ userId });
    const user = await User.findOne({ _id: userId });

    const {
      payment: {
        address: {
          line1 = '',
          country = ''
        }
      }
    } = user || {};

    SendEmail(
      process.env.ADMIN_EMAIL,
      'User Subscription Status!',
      cancelledSubscription(
        user.name,
        user.email,
        `${line1} ${country}`
      )
    ).then(() => console.log('user subscription is cancelled'));

    SendEmail(
      user.email,
      'User Subscription Status!',
      cancelledSubscription(
        user.name,
        user.email,
        `${line1} ${country}`
      )
    ).then(() => console.log('user subscription is cancelled'));

    res.status(200).json({
      success: true,
      message: 'Subscription Cancelled Successfully!!!'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.get('/get-keepa-keys', async (req, res) => {
  try {
    const { _id: userId } = req.user;
    
    const response = await GetKeepaKeys({ userId });

    res.status(200).json({
      success: true,
      keepaKeys: response
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.get('/get-user', async (req, res) => {
  try {
    const { _id } = req.user;
    const { impersonateUserId } = req.query || {};

    let userId = _id;
    if (impersonateUserId) {
      userId = impersonateUserId;
    }

    const user = await GetUser({ userId });

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.get('/get-users', async (req, res) => {
  try {
    const {
      searchKeyword,
      limit,
      skip
    } = req.query;

    const response = await GetUsers({
      searchKeyword,
      limit,
      skip
    });

    res.status(200).json({
      success: true,
      ...response
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/invite-user', async (req, res) => {
  try {
    const { email } = req.body;

    await InviteUser({ email });

    res.status(200).json({
      success: true,
      message: 'User has Invited Successfully!'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/update-keepa-key-time', async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { userId: keepaUserId } = req.body || {};

    await UpdateKeepaKeyTime({
      userId,
      keepaUserId
    });

    res.status(200).json({
      success: true,
      message: 'Keepa Key time updated!'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/update-profile-info', async (req, res) => {
  try {
    const {
      _id
    } = req.user;

    const {
      impersonateUserId,
      name,
      newPassword,
      oldPassword
    } = req.body;

    let userId = _id;
    if (impersonateUserId) {
      userId = impersonateUserId;
    }

    await UpdateProfileInfo({
      userId,
      name,
      newPassword,
      oldPassword
    });

    res.status(200).json({
      success: true,
      message: 'Account Info Updated!'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/update-user-password', async (req, res) => {
  try {
    const {
      userId,
      password
    } = req.body;

    const message = await UpdateUserPassword({
      userId,
      password
    });

    res.status(200).json({
      success: true,
      message
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/delete-user', async (req, res) => {
  try {
    const { userId } = req.body;

    await DeleteUser({ userId });

    res.status(200).json({
      success: true,
      message: 'User has deleted Successfully!'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.get('/keepa-key-validation', async (req, res) => {
  try {
    const { key, userId } = req.query;

    await KeepaKeyValidation({ key, userId });

    res.status(200).json({
      success: true,
      message: key ? 'Keepa Key is added in your account successfully.' : 'Keepa Key is Removed from your account.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/add-sub-user', async (req, res) => {
  try {
    const {
      email,
      name,
      userId,
      specialSubUser
    } = req.body;

    await AddSubUser({
      email,
      name,
      userId,
      specialSubUser
    });

    res.status(200).json({
      success: true,
      message: 'Sub User has Invited Successfully!'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-sub-users', async (req, res) => {
  try {
    const {
      userId,
      limit,
      skip,
      searchKeyword
    } = req.query;

    const response = await GetSubUsers({
      userId,
      limit,
      skip,
      searchKeyword
    });

    res.status(200).json({
      success: true,
      ...response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-referral-users', async (req, res) => {
  try {
    const {
      userId,
      limit,
      skip,
      searchKeyword
    } = req.query;

    const response = await GetReferralUsers({
      userId,
      limit,
      skip,
      searchKeyword
    });

    res.status(200).json({
      success: true,
      ...response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-user-invoices', async (req, res) => {
  try {
    const {
      userId,
    } = req.query;
    const response = await GetUserInvoices({
      userId
    });

    res.status(200).json({
      success: true,
      invoices: response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;
