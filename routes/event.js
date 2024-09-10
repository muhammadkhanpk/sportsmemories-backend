import express from 'express';
import Joi from 'joi';
import Event from '../models/event';

import {
  CreateAlbum,
  CreateEvent,
  DeleteEvent,
  GetAllEvents,
  GetEvent,
  GetUserEvents,
  UpdateEvent,
  UploadEventMedia
} from '../controllers/events';

import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/create-event', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      userId,
      media
    } = req.body;
    const response = await CreateEvent({
      name,
      description,
      userId,
      media
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

router.post('/update-event', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      eventId,
      media
    } = req.body;

    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      const error = new Error('Event is not found!');
      throw error;
    }

    const response = await UpdateEvent({
      name,
      description,
      eventId,
      media
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

router.post('/upload-event-media', validateParams({
  media: Joi.array().items(Joi.string()).min(1).required(),
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      eventId,
      media
    } = req.body;

    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      const error = new Error('Event is not found!');
      throw error;
    }

    const response = await UploadEventMedia({
      eventId,
      newMedia: media
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

router.get('/get-all-events', async (req, res) => {
  try {
    const events = await GetAllEvents({});
    res.status(200).json({
      success: true,
      events
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
})

router.post('/get-event', validateParams({
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      eventId,
    } = req.body;

    const oldEvent = await Event.findOne({ _id: eventId });
    if (!oldEvent) {
      const error = new Error('Event is not found!');
      throw error;
    }
    
    const event = await GetEvent({
      eventId
    });

    res.status(200).json({
      success: true,
      event
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/delete-event', validateParams({
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      eventId,
    } = req.body;

    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      const error = new Error('Event is not found!');
      throw error;
    }

    await DeleteEvent({
      eventId
    });

    res.status(200).json({
      success: true,
      message: 'Event is deleted successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/get-user-events', validateParams({
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
    } = req.body;
    const events = await GetUserEvents({
      userId
    });

    res.status(200).json({
      success: true,
      events
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;