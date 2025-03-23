import express from 'express';
import catchResponse from '../utils/catch-response';
import {
  SaveCheckIn,
  GetCheckIn
} from '../controllers/check-in';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
const router = express.Router();

router.post('/save-check-in', validateParams({
  question1: Joi.number().required(),
  question2: Joi.number().required(),
  question3: Joi.number().required(),
  question4: Joi.number().required(),
  question5: Joi.number().required(),
  question1Msg: Joi.number().required(),
  question2Msg: Joi.number().required(),
  question3Msg: Joi.number().required(),
  question4Msg: Joi.number().required(),
  question5Msg: Joi.number().required(),
}), async (req, res) => {
  try {
    const {
      _id: userId
    } = req.user;

    const {
      question1,
      question2,
      question3,
      question4,
      question5,
      question1Msg,
      question2Msg,
      question3Msg,
      question4Msg,
      question5Msg
    } = req.body || {}
    
    const response = await SaveCheckIn({
      userId,
      question1,
      question2,
      question3,
      question4,
      question5,
      question1Msg,
      question2Msg,
      question3Msg,
      question4Msg,
      question5Msg
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

router.get('/get-check-in', async (req, res) => {
  try {
    const {
      _id: userId,
    } = req.user;
    
    const checkin = await GetCheckIn({
      userId
    });

    res.status(200).json({
      success: true,
      ...checkin
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;