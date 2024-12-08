import express from 'express';
import catchResponse from '../utils/catch-response';
import {
  AddTag,
  GetTags,
  UpdateTag
} from '../controllers/tags';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
import Tags from '../models/tags';

const router = express.Router();

router.post('/add-tag', validateParams({
  tag: Joi.string().required(),
  url: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      tag,
      url
    } = req.body;
    const response = await AddTag({
      url,
      tag
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