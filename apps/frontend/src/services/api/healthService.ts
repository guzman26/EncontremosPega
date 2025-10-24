/**
 * Health API Service
 */
import httpClient from '../http/httpClient';
import { HealthResponse } from '../../types/api.types';

class HealthService {
  /**
   * Check API health status
   */
  async healthCheck(): Promise<HealthResponse> {
    return httpClient.get('/health');
  }
}

export default new HealthService();
