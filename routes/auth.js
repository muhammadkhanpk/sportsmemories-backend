import express from 'express';
import Joi from 'joi';

import User from '../models/user';
import {
  SignIn,
  SignUp,
  VerifyOtp,
  ResetPassword,
  ChangePassword
} from '../controllers/auth';

import { loginCheck } from '../middlewares/auth';
import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/sign-up', validateParams({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8)
}), async (req, res) => {
  try {
    const {
      email,
      name,
      password
    } = req.body;
    const response = await SignUp({
      name, email, password
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

router.post('/sign-up-coach', validateParams({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  skills: Joi.string().required(),
  experience: Joi.string().required(),
  bio: Joi.string().required().min(20),
  hourlyrate: Joi.number().required(),
}), async (req, res) => {
  try {
    const {
      email,
      name,
      password,
      skills,
      experience,
      bio,
      hourlyrate
    } = req.body;
    const response = await SignUp({
      name,
      email,
      password,
      skills,
      experience,
      bio,
      hourlyrate,
      role: 'coach'
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

router.post('/sign-in', validateParams({
  email: Joi.string().required().email(),
  password: Joi.string().required()
}), loginCheck, async (req, res) => {
  try {
    const { email } = req.body;
    
    const response = await SignIn({ email });

    res.status(200).json({
      success: true,
      message: 'Sign In Successfully',
      ...response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/verify-otp', validateParams({
  email: Joi.string().required().email(),
  otp: Joi.number().required()
}), async (req, res) => {
  try {
    const { email, otp } = req.body;

    await VerifyOtp({
      email,
      otp
    })
    
    res.status(200).json({
      success: true,
      message: 'OTP Verified Successfully.',
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/reset-password', validateParams({
  email: Joi.string().required().email(),
}), async (req, res) => {
  try {
    const { email } = req.body;

    await ResetPassword({
      email
    });
    
    res.status(200).json({
      success: true,
      message: 'Reset Password OTP Send Successfully.',
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/change-password', validateParams({
  email: Joi.string().required().email(),
  newPassword: Joi.string().required(),
  otp: Joi.number().required(),
}), async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    await ChangePassword({
      email,
      password: newPassword,
      otp
    });
    
    res.status(200).json({
      success: true,
      message: 'Password Changed Successfully.',
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;
