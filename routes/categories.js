import express from 'express';
import catchResponse from '../utils/catch-response';
import validateParams from '../middlewares/validate-params';
import Joi from 'joi';
import Categories from '../models/categories';
import { SaveCategory, GetCategories, UpdateCategory, DeleteCategory } from '../controllers/categories';

const router = express.Router();

router.post('/save-category', validateParams({
  name: Joi.string().required(),
  type: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      name,
      type
    } = req.body;
    const response = await SaveCategory({
      name,
      type
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

router.get('/get-categories', validateParams({
  categoryType: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      categoryType,
    } = req.query;
    
    const categories = await GetCategories({
      type: categoryType
    });

    res.status(200).json({
      success: true,
      categories
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/delete-category', validateParams({
  categoryId: Joi.string().required(),
}), async (req, res) => {
  try {
    const {
      categoryId,
    } = req.body;

    const category = await Categories.findOne({ _id: categoryId });
    if (!category) {
      const error = new Error('Category is not found!');
      throw error;
    }
    
    await DeleteCategory({
      id: categoryId
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted Successfully.'
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

router.post('/update-category', async (req, res) => {
  try {
    const {
      categoryId,
      name,
      type
    } = req.body;

    const category = await Categories.findOne({ _id: categoryId });
    if (!category) {
      const error = new Error('Category is not found!');
      throw error;
    }

    const response = await UpdateCategory({
      id: categoryId,
      name,
      type
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