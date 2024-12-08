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

router.get('/get-tags', validateParams({
  url: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      url,
    } = req.query;

    const oldTag = await Tags.findOne({ url });
    if (!oldTag) {
      const error = new Error('Tag is not found!');
      throw error;
    }
    
    const tag = await GetTags({
      url
    });

    res.status(200).json({
      success: true,
      ...tag
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/update-tag', validateParams({
  tags: Joi.array().items(Joi.string()).min(1).required(),
  url: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      url,
      tags
    } = req.body;

    const tag = await Tags.findOne({ url });
    if (!tag) {
      const error = new Error('Tag is not found!');
      throw error;
    }

    const response = await UpdateTag({
      tags,
      url
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