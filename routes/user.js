import express from "express";
import Joi from "joi";

import validateParams from "../middlewares/validate-params";
import {
  DeleteUser,
  GetUser,
  UpdateProfileInfo,
  UpdateUserPassword,
  GetAllUsers,
  GetAllCoaches,
  UpdateCoachStatus,
} from "../controllers/users";

import catchResponse from "../utils/catch-response";
import { sleep } from "../utils/helpers";

const router = express.Router();

router.get("/get-user", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await GetUser({ userId });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    catchResponse({
      res,
      err,
    });
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const { searchKeyword, limit, skip } = req.query;

    const response = await GetAllUsers({
      searchKeyword,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      users: response,
    });
  } catch (err) {
    catchResponse({
      res,
      err,
    });
  }
});

router.get("/get-all-coaches", async (req, res) => {
  try {
    const { searchKeyword, limit, skip } = req.query;

    const {
      _id: userId,
    } = req.user;

    const response = await GetAllCoaches({
      searchKeyword,
      limit,
      skip,
      userId
    });

    res.status(200).json({
      success: true,
      coaches: response,
    });
  } catch (err) {
    catchResponse({
      res,
      err,
    });
  }
});

router.post(
  "/update-coach-status",
  validateParams({
    userId: Joi.string().required(),
    status: Joi.boolean().required(),
  }),
  async (req, res) => {
    try {
      const { userId, status } = req.body;

      const user = await UpdateCoachStatus({ userId, status });

      res.status(200).json({
        success: true,
        message: "Coach status updated Successfully!",
        user
      });
    } catch (err) {
      catchResponse({
        res,
        err,
      });
    }
  }
);

router.post('/update-profile-info', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      sportsClubName,
      profileImage,
      bio,
      userId,
      payPalEmail
    } = req.body || {};
    const response = await UpdateProfileInfo({
      firstName,
      lastName,
      sportsClubName,
      profileImage,
      bio,
      userId,
      payPalEmail
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

router.post(
  "/update-user-password",
  validateParams({
    userId: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
  async (req, res) => {
    try {
      const { userId, newPassword, oldPassword } = req.body;

      const message = await UpdateUserPassword({
        userId,
        newPassword,
        oldPassword
      });

      res.status(200).json({
        success: true,
        message,
      });
    } catch (err) {
      catchResponse({
        res,
        err,
      });
    }
  }
);

router.post("/delete-user", async (req, res) => {
  try {
    const { userId } = req.body;

    await DeleteUser({ userId });

    res.status(200).json({
      success: true,
      message: "User has deleted Successfully!",
    });
  } catch (err) {
    catchResponse({
      res,
      err,
    });
  }
});

export default router;
