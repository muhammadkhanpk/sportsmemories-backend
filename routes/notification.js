import express from 'express';
import catchResponse from '../utils/catch-response';


import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
import {
  SaveNotificationSettings,
  GetNotificationSettings
} from '../controllers/notification';
import NotificationSettings from '../models/notification-setting';

const router = express.Router();

router.post('/save-notification-settings', async (req, res) => {
  try {
    const {
      inbox,
      events,
      promotions,
      account,
      userId
    } = req.body;
    const response = await SaveNotificationSettings({
      inbox,
      events,
      promotions,
      account,
      userId
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

router.get('/get-notification-settings', validateParams({
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
    } = req.query;

    const oldNoti = await NotificationSettings.findOne({ userId });
    if (!oldNoti) {
      res.status(200).json({
        success: true,
        inbox: false,
        events: false,
        account: false,
        promotions: false,
        userId
      });
    }
    
    const noti = await GetNotificationSettings({
      userId
    });

    res.status(200).json({
      success: true,
      ...noti
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;