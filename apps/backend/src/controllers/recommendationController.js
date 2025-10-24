import { getAllCompanies } from '../models/companyModel.js';
import { generateRecommendations } from '../services/recommendationService.js';

/**
 * Get recommendations based on user profile controller
 */
export const getRecommendationsController = (req, res) => {
  try {
    const { userProfile, limit = 8 } = req.body;
    
    if (!userProfile) {
      return res.status(400).json({ error: 'User profile is required' });
    }
    
    const companies = getAllCompanies();
    const { recommendations, stats } = generateRecommendations(userProfile, companies, limit);
    
    res.json({
      recommendations,
      stats
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Error generating recommendations' });
  }
};
