import express from 'express';
import {
  getAllCompaniesController,
  getCompaniesByIndustryController,
  getCompanyByIdController,
  createCompanyController
} from '../controllers/companyController.js';

const router = express.Router();

// GET all companies
router.get('/', getAllCompaniesController);

// GET company by ID
router.get('/:id', getCompanyByIdController);

// GET companies by industry
router.get('/industry/:industry', getCompaniesByIndustryController);

// POST create new company
router.post('/', createCompanyController);

export default router;
