import express from 'express';

import {
  CreateCustomer,
  UpdateCustomer
} from '../controllers/stripe';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/create-customer', async (req, res) => {
  try {
    const {
      user: {
        _id: userId,
        email,
        name: userName
      },
      body: {
        token,
        name,
        address
      }
    } = req;

    const response = await CreateCustomer({
      userId,
      token,
      email,
      name: name || userName,
      address,
      description: ''
    });

    res.status(200).json({
      response
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

router.post('/update-customer', async (req, res) => {
  try {
    const {
      user: {
        _id: userId,
        email,
        name: userName
      },
      body: {
        token,
        stripeUserId,
        name,
        address
      }
    } = req;

    await UpdateCustomer({
      userId,
      token,
      stripeUserId,
      email,
      name: name || userName,
      address
    });

    res.status(200).json({
      message: 'Card Updated Successfully'
    });
  } catch (err) {
    await catchResponse({
      res,
      err
    });
  }
});

export default router;
