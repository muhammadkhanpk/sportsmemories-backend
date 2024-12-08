import express from 'express';
import catchResponse from '../utils/catch-response';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
import { EditMessage, DeleteMessage } from '../controllers/messages';

const router = express.Router();

router.post('/edit-message', async (req, res) => {
  try {
    const {
      text,
      image,
      messageId
    } = req.body;

    const {
      _id: userId,
    } = req.user || {}
    
    const response = await EditMessage({
      userId,
      messageId,
      text,
      image
    });

    res.status(200).json({
      success: true,
      ...response,
      message: 'Message Edited Successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/delete-message', validateParams({
  messageId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      messageId,
    } = req.body;

    const {
      _id: userId,
    } = req.user || {}
    
    DeleteMessage({
      userId,
      messageId
    });

    res.status(200).json({
      success: true,
      message: 'Message Deleted Successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;