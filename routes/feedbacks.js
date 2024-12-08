import express from 'express';
import catchResponse from '../utils/catch-response';
import {
  AddFeedback,
  GetAllFeedbacks
} from '../controllers/feedbacks';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
import Feedbacks from '../models/Feedbacks';

const router = express.Router();

router.post('/add-feedback', validateParams({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      email,
      name,
      userId,
      message
    } = req.body;
    const response = await AddFeedback({
      email,
      name,
      userId,
      message
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

router.get('/get-feedbacks', async (req, res) => {
  try {
    const feedbacks = await GetAllFeedbacks()
    res.status(200).json({
      success: true,
      feedbacks
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;