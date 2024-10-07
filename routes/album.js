import express from 'express';
import Joi from 'joi';
import Album from '../models/album';

import {
  CreateAlbum,
  DeleteAlbum,
  GetAlbum,
  UpdateAlbum,
  UploadAlbumMedia,
  GetEventAlbums
} from '../controllers/albums';

import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';

const router = express.Router();

router.post('/create-album', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  eventId: Joi.string().required(),
  albumType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      media,
      eventId,
      albumType
    } = req.body;
    const response = await CreateAlbum({
      name,
      description,
      eventId,
      media,
      albumType
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

router.post('/update-album', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  albumId: Joi.string().required(),
  albumType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      albumId,
      media,
      albumType
    } = req.body;

    const album = await Album.findOne({ _id: albumId });
    if (!album) {
      const error = new Error('Album is not found!');
      throw error;
    }

    const response = await UpdateAlbum({
      name,
      description,
      albumId,
      media,
      albumType
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

router.post('/upload-album-media', validateParams({
  media: Joi.array().items(Joi.string()).min(1).required(),
  albumId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      albumId,
      media
    } = req.body;

    const album = await Album.findOne({ _id: albumId });
    if (!album) {
      const error = new Error('Album is not found!');
      throw error;
    }

    const response = await UploadAlbumMedia({
      albumId,
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

router.get('/get-album', validateParams({
  albumId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      albumId,
    } = req.query;

    const oldAlbum = await Album.findOne({ _id: albumId });
    if (!oldAlbum) {
      const error = new Error('Album is not found!');
      throw error;
    }
    
    const album = await GetAlbum({
      albumId
    });

    res.status(200).json({
      success: true,
      album
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-event-albums', validateParams({
  eventId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      eventId,
    } = req.query;
    
    const albums = await GetEventAlbums({
      eventId
    });

    res.status(200).json({
      success: true,
      albums
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/delete-album', validateParams({
  albumId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      albumId,
    } = req.body;

    const album = await Album.findOne({ _id: albumId });
    if (!album) {
      const error = new Error('Album is not found!');
      throw error;
    }

    await DeleteAlbum({
      albumId
    });

    res.status(200).json({
      success: true,
      message: 'Album is deleted successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;