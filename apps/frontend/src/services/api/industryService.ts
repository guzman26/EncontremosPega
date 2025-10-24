/**
 * Industry API Service
 */
import httpClient from '../http/httpClient';
import { Industry } from '../../types/api.types';

class IndustryService {
  /**
   * Get all industries
   */
  async getIndustries(): Promise<Industry[]> {
    return httpClient.get('/industries');
  }
}

export default new IndustryService();
