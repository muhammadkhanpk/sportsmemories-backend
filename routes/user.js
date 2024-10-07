import express from 'express';

import {
  DeleteUser,
  GetUser,
  UpdateProfileInfo,
  UpdateUserPassword,
  GetAllUsers,
  GetAllCoaches
} from '../controllers/users';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.get('/get-user', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await GetUser({ userId });

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-all-users', async (req, res) => {
  try {
    const {
      searchKeyword,
      limit,
      skip
    } = req.query;

    const response = await GetAllUsers({
      searchKeyword,
      limit,
      skip
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

router.get('/get-all-coaches', async (req, res) => {
  try {
    const {
      searchKeyword,
      limit,
      skip
    } = req.query;

    const response = await GetAllCoaches({
      searchKeyword,
      limit,
      skip
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
    catchResponse({
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
    catchResponse({
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
    catchResponse({
      res,
      err
    });
  }
});

export default router;
