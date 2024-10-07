import express from 'express';
import Joi from 'joi';

import {
  CreateGroup,
} from '../controllers/groups';

import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/create-group', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  groupType: Joi.string().required(),
  userId: Joi.string().required(),
  media: Joi.array().items(Joi.string()).min(1).required()
}), async (req, res) => {
  try {
    const {
      name,
      description,
      groupType,
      userId,
      media,
    } = req.body;
    const response = await CreateGroup({
      name,
      description,
      groupType,
      userId,
      media,
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

export default router;