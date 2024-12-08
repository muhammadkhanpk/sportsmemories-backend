import express from 'express';

import {
  CreateCustomer,
  UpdateCustomer,
  CreatePaymentIntent,
  SavePayment,
  GetAllPayments,
  GetCoachPayments
} from '../controllers/stripe';

import catchResponse from '../utils/catch-response';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const {
      currency = 'usd',
      amount
    } = req.body;
    const response = await CreatePaymentIntent({
      currency,
      amount,
    });

    res.status(200).json({
      clientSecret: response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/save-payment', async (req, res) => {
  try {
    const {
      currency = 'usd',
      amount,
      userId,
      coachId,
      ...rest
    } = req.body;
    const response = await SavePayment({
      currency,
      amount,
      userId,
      coachId,
      data: rest
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

router.get('/get-coach-payments', validateParams({
  coachId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      coachId,
    } = req.query;
    
    const payments = await GetCoachPayments({
      coachId
    });

    res.status(200).json({
      success: true,
      payments
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-all-payments', async (req, res) => {
  try {
    const payments = await GetAllPayments({});
    res.status(200).json({
      success: true,
      payments
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

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
