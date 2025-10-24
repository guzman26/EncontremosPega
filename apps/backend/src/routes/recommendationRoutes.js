import express from 'express';
import { getRecommendationsController } from '../controllers/recommendationController.js';

const router = express.Router();

// POST recommendations based on user profile
router.post('/', getRecommendationsController);

export default router;
