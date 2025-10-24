/**
 * API data types for the application
 */
import type { UserProfile, Company as CompanyBase } from './index';

/**
 * Extended company type with API-specific properties
 */
export interface Company extends CompanyBase {
  tags?: string[];
}

/**
 * Industry information from API
 */
export interface Industry {
  id: string;
  name: string;
  count: number;
}

/**
 * Recommendation statistics
 */
export interface RecommendationStats {
  totalCompanies: number;
  recommendedCompanies: number;
  averageMatch: number;
  topMatch: number;
  userInterests: string[];
  industries: string[];
}

/**
 * Recommendations API response
 */
export interface RecommendationsResponse {
  recommendations: Company[];
  stats: RecommendationStats;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  totalCompanies: number;
}

// Re-export UserProfile for convenience
export type { UserProfile };
