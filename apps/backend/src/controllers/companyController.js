import { getAllCompanies, getCompaniesByIndustry, getCompanyById, createCompany } from '../models/companyModel.js';
import config from '../config/index.js';

/**
 * Get all companies controller
 */
export const getAllCompaniesController = (req, res) => {
  try {
    const companies = getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
};

/**
 * Get companies by industry controller
 */
export const getCompaniesByIndustryController = (req, res) => {
  try {
    const { industry } = req.params;
    const companies = getCompaniesByIndustry(industry);
    
    if (!companies.length) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies by industry' });
  }
};

/**
 * Get company by ID controller
 */
export const getCompanyByIdController = (req, res) => {
  try {
    const company = getCompanyById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching company' });
  }
};

/**
 * Create company controller
 */
export const createCompanyController = (req, res) => {
  try {
    const {
      name,
      logo,
      description,
      industry,
      size,
      location,
      culture,
      benefits,
      openPositions,
      rating,
      website,
      tags
    } = req.body;

    // Validation
    if (!name || !description || !industry || !size || !location) {
      return res.status(400).json({ 
        error: 'Required fields: name, description, industry, size, location' 
      });
    }

    if (!config.validIndustries.includes(industry.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid industry. Valid options: ' + config.validIndustries.join(', ')
      });
    }

    // Create new company
    const newCompany = createCompany({
      name,
      logo,
      description,
      industry,
      size,
      location,
      culture,
      benefits,
      openPositions,
      rating,
      website,
      tags
    });

    res.status(201).json({
      message: 'Company created successfully',
      company: newCompany
    });

  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Error creating company' });
  }
};
