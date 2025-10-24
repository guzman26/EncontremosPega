import httpClient from './http/httpClient';
import type { 
  Company, 
  UserProfile, 
  Industry, 
  RecommendationStats, 
  RecommendationsResponse,
  HealthResponse 
} from '../types/api.types';

class ApiService {
  /**
   * Health Check
   */
  async healthCheck(): Promise<HealthResponse> {
    return httpClient.get('/health');
  }

  /**
   * Get all companies
   */
  async getAllCompanies(): Promise<Company[]> {
    return httpClient.get('/companies');
  }

  /**
   * Get a specific company by ID
   */
  async getCompanyById(id: string): Promise<Company> {
    return httpClient.get(`/companies/${id}`);
  }

  /**
   * Get companies by industry
   */
  async getCompaniesByIndustry(industry: string): Promise<Company[]> {
    return httpClient.get(`/companies/industry/${industry}`);
  }

  /**
   * Create a new company (admin only)
   */
  async createCompany(companyData: Partial<Company>): Promise<{ message: string; company: Company }> {
    return httpClient.post('/companies', companyData);
  }

  /**
   * Get all industries
   */
  async getIndustries(): Promise<Industry[]> {
    return httpClient.get('/industries');
  }

  /**
   * Get recommendations based on user profile
   */
  async getRecommendations(userProfile: UserProfile, limit = 8): Promise<RecommendationsResponse> {
    return httpClient.post('/recommendations', { userProfile, limit });
  }
}

export const apiService = new ApiService();
export type { Company, UserProfile, Industry, RecommendationStats, RecommendationsResponse, HealthResponse }; 