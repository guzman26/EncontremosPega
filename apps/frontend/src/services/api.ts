const API_BASE_URL = 'http://localhost:3001/api';

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: 'startup' | 'medium' | 'large';
  location: string;
  culture: string[];
  benefits: string[];
  openPositions: string[];
  rating: number;
  website: string;
  tags?: string[];
  matchPercentage?: number;
}

interface Industry {
  id: string;
  name: string;
  count: number;
}

interface RecommendationStats {
  totalCompanies: number;
  recommendedCompanies: number;
  averageMatch: number;
  topMatch: number;
  userInterests: string[];
  industries: string[];
}

interface RecommendationsResponse {
  recommendations: Company[];
  stats: RecommendationStats;
}

interface UserProfile {
  email: string;
  name?: string;
  phone?: string;
  age?: number;
  location?: string;
  interests?: string[];
  workPreferences?: {
    location: 'remote' | 'hybrid' | 'office';
    schedule?: 'full-time' | 'part-time';
  };
  companyPreferences?: {
    size?: 'startup' | 'medium' | 'large';
    culture?: string;
    benefits?: string;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string; totalCompanies: number }> {
    return this.request('/health');
  }

  // Companies
  async getAllCompanies(): Promise<Company[]> {
    return this.request('/companies');
  }

  async getCompanyById(id: string): Promise<Company> {
    return this.request(`/companies/${id}`);
  }

  async getCompaniesByIndustry(industry: string): Promise<Company[]> {
    return this.request(`/companies/industry/${industry}`);
  }

  // Industries
  async getIndustries(): Promise<Industry[]> {
    return this.request('/industries');
  }

  // Recommendations
  async getRecommendations(userProfile: UserProfile, limit = 8): Promise<RecommendationsResponse> {
    return this.request('/recommendations', {
      method: 'POST',
      body: JSON.stringify({ userProfile, limit }),
    });
  }
}

export const apiService = new ApiService();
export type { 
  Company, 
  UserProfile, 
  Industry, 
  RecommendationStats, 
  RecommendationsResponse
}; 