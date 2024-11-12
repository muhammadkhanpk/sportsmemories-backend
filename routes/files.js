import express from 'express';
import catchResponse from '../utils/catch-response';
import { GetPresignedURL } from '../controllers/files';

const router = express.Router();

router.get('/get-presigned-url', async (req, res) => {
  try {
    const {
      bucketName,
      key,
      fileType
    } = req.query;

    const { _id: userId } = req.user|| {};

    const bucket = `${userId}/${bucketName.replaceAll(' ','')}_bucket`;

    const response = await GetPresignedURL({
      bucketName: bucket,
      fileType,
      key
    })

    res.status(200).json({
      success: true,
      url: response
    });
  } catch (err) {
    catchResponse({
      res,
      err
    });
  }
});

export default router;