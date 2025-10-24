import { getIndustries } from '../models/companyModel.js';

/**
 * Get all industries controller
 */
export const getIndustriesController = (req, res) => {
  try {
    const industries = getIndustries();
    res.json(industries);
  } catch (error) {
    console.error('Error fetching industries:', error);
    res.status(500).json({ error: 'Error fetching industries' });
  }
};
