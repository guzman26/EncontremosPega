import express from 'express';
import { getIndustriesController } from '../controllers/industryController.js';

const router = express.Router();

// GET all industries
router.get('/', getIndustriesController);

export default router;
