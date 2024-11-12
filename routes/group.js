import express from 'express';
import Joi from 'joi';

import {
  CreateGroup,
  JoinGroup,
  GetMyGroups,
  GetUserJoinedGroups,
  LeaveGroup,
  GetPublicGroups,
  UpdateGroup,
  DeleteGroup
} from '../controllers/groups';

import validateParams from '../middlewares/validate-params';

import catchResponse from '../utils/catch-response';
import Group from '../models/group';

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

router.post('/join-group', validateParams({
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
    userId,
    groupId
    } = req.body;
    const response = await JoinGroup({
      userId,
      groupId
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

router.post('/delete-group', validateParams({
  groupId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
    groupId
    } = req.body;

    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      const error = new Error('Group is not found!');
      throw error;
    }

    await DeleteGroup({
      groupId
    })

    res.status(200).json({
      success: true,
      message: 'Group is deleted successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/update-group', validateParams({
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
  media: Joi.array().items(Joi.string()).min(1).required(),
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
  groupType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      description,
      userId,
      groupId,
      media,
      groupType
    } = req.body;

    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      const error = new Error('Group is not found!');
      throw error;
    }

    const response = await UpdateGroup({
      name,
      description,
      userId,
      groupType,
      media,
      groupId
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

router.get('/get-my-groups', validateParams({
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
    } = req.query;
    
    const groups = await GetMyGroups({
      userId
    });

    res.status(200).json({
      success: true,
      groups
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-public-groups', async (req, res) => {
  try {
    const {
      _id: userId,
    } = req.user;
    
    const groups = await GetPublicGroups({
      userId
    });

    res.status(200).json({
      success: true,
      groups
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.get('/get-user-joined-groups', validateParams({
  userId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
    } = req.query;
    
    const groups = await GetUserJoinedGroups({
      userId
    });

    res.status(200).json({
      success: true,
      groups
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/leave-group', validateParams({
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      userId,
      groupId
    } = req.body;
    
    await LeaveGroup({
      userId,
      groupId
    });

    res.status(200).json({
      success: true,
      message: "Group Leaved Successfully!"
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;