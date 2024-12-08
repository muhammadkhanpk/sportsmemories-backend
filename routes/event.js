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
  UploadEventMedia,
  MarkAsFavourite,
  CheckIsFavourite,
  GetUserFavourites
} from '../controllers/events';

import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/create-event', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  userId: Joi.string().required(),
  eventType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      userId,
      eventType,
      media,
    } = req.body;
    const response = await CreateEvent({
      name,
      description,
      userId,
      eventType,
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

router.post('/update-event', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  eventId: Joi.string().required(),
  eventType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      eventId,
      eventType,
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
      eventType,
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
      newMedia: media,
      name: 'Uncategorized'
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

router.get('/get-event', validateParams({
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      eventId,
    } = req.query;

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

router.get('/get-user-events', validateParams({
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
    } = req.query;
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

router.post('/mark-as-favourite',  async (req, res) => {
  try {
    const {
      userId,
      dataType,
      url,
      eventId 
    } = req.body || {};
    const response = await MarkAsFavourite({
      url,
      dataType,
      userId,
      eventId
    });

    res.status(200).json({
      success: true,
      ... response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/check-is-favourite', async (req, res) => {
  try {
    const {
      userId,
      url,
      eventId,
      dataType
    } = req.query;
    const isFavourite = await CheckIsFavourite({
      userId,
      url,
      eventId,
      dataType
    });

    res.status(200).json({
      success: true,
      isFavourite
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-user-favourites', validateParams({
  userId: Joi.string().required(),
  dataType: Joi.string().required()
}), async (req, res) => {
  try {
    const {
      userId,
      dataType
    } = req.query;
    const userFavourites = await GetUserFavourites({
      userId,
      dataType
    });

    res.status(200).json({
      success: true,
      userFavourites
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;