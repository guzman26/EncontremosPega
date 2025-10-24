/**
 * Recommendation API Service
 */
import httpClient from '../http/httpClient';
import { RecommendationsResponse, UserProfile } from '../../types/api.types';

class RecommendationService {
  /**
   * Get recommendations based on user profile
   */
  async getRecommendations(userProfile: UserProfile, limit = 8): Promise<RecommendationsResponse> {
    return httpClient.post('/recommendations', { userProfile, limit });
  }
}

export default new RecommendationService();
