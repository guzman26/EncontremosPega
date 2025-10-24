import type { UserProfile, Company } from '../types';
import { apiService } from '../services/api';

/**
 * Get all companies from the backend
 */
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    return await apiService.getAllCompanies();
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};

/**
 * Get recommended companies based on user profile
 */
export const getRecommendedCompanies = async (userProfile: UserProfile): Promise<Company[]> => {
  try {
    const response = await apiService.getRecommendations(userProfile, 6);
    return response.recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

/**
 * Mapping functions to standardize values between frontend and backend
 */
const mapWorkLocation = (location?: string): 'remote' | 'hybrid' | 'office' | undefined => {
  if (!location) return undefined;
  const validLocations = ['remote', 'hybrid', 'office'] as const;
  return validLocations.includes(location as any) ? (location as any) : undefined;
};

const mapCompanySize = (size?: string): 'startup' | 'medium' | 'large' | undefined => {
  if (!size) return undefined;
  const validSizes = ['startup', 'medium', 'large'] as const;
  return validSizes.includes(size as any) ? (size as any) : undefined;
};

/**
 * Maps culture preference to backend format
 */
const CULTURE_MAP: Record<string, string> = {
  'innovation': 'Innovación y Tecnología',
  'work-life-balance': 'Work-Life Balance',
  'growth': 'Crecimiento Profesional',
  'collaboration': 'Trabajo en Equipo',
  'impact': 'Impacto Social',
  'autonomy': 'Autonomía',
};

const mapCulture = (culture?: string): string | undefined => {
  if (!culture) return undefined;
  return CULTURE_MAP[culture] || culture;
};

/**
 * Maps benefits preference to backend format
 */
const BENEFITS_MAP: Record<string, string> = {
  'remote': 'Trabajo Remoto',
  'learning': 'Capacitación y Cursos',
  'health': 'Seguro de Salud',
  'vacation': 'Vacaciones Flexibles',
  'bonus': 'Bonos por Desempeño',
  'equipment': 'Equipos de Trabajo',
};

const mapBenefits = (benefits?: string): string | undefined => {
  if (!benefits) return undefined;
  return BENEFITS_MAP[benefits] || benefits;
};

/**
 * Calculate match percentage between user profile and company
 */
export const calculateMatchPercentage = (profile: UserProfile, company: Company): number => {
  let score = 0;
  let maxScore = 0;

  // Company size preference (20 points)
  maxScore += 20;
  if (profile.companyPreferences?.size === company.size) {
    score += 20;
  } else if (profile.companyPreferences?.size === 'medium' && (company.size === 'startup' || company.size === 'large')) {
    score += 10; // Partial match
  }

  // Culture match (25 points)
  maxScore += 25;
  if (profile.companyPreferences?.culture) {
    const userCulture = profile.companyPreferences.culture;
    const cultureMatch = company.culture.includes(userCulture);
    if (cultureMatch) {
      score += 25;
    }
  }

  // Benefits match (25 points)
  maxScore += 25;
  if (profile.companyPreferences?.benefits) {
    const userBenefit = profile.companyPreferences.benefits;
    const benefitMatch = company.benefits.includes(userBenefit);
    if (benefitMatch) {
      score += 25;
    }
  }

  // Industry/Interest alignment (20 points)
  maxScore += 20;
  score += calculateInterestAlignment(profile.interests, company.industry);

  // Work preferences (10 points)
  maxScore += 10;
  score += calculateWorkPreferencesScore(profile.workPreferences?.location, company.benefits);

  // Ensure score is between 0-100
  const percentage = Math.round((score / maxScore) * 100);
  return Math.min(100, Math.max(60, percentage)); // Minimum 60% to ensure reasonable matches
};

/**
 * Calculate interest alignment score with industry
 */
const calculateInterestAlignment = (interests: string[] | undefined, industry: string): number => {
  if (!interests || interests.length === 0) return 0;

  const INDUSTRY_KEYWORDS: Record<string, string[]> = {
    'frontend': ['E-commerce', 'Software Development', 'Fintech'],
    'backend': ['Software Development', 'Fintech', 'Enterprise Software'],
    'mobile': ['E-commerce', 'Software Development'],
    'data': ['FoodTech & AI', 'Fintech', 'E-commerce'],
    'ai': ['FoodTech & AI', 'Enterprise Software'],
    'devops': ['Software Development', 'Enterprise Software'],
    'cybersecurity': ['Fintech & Banking', 'Enterprise Software'],
    'cloud': ['Software Development', 'Enterprise Software'],
    'blockchain': ['Fintech', 'Enterprise Software'],
    'iot': ['Enterprise Software', 'FoodTech & AI'],
  };

  const relevantInterests = interests.filter(interest => {
    const keywords = INDUSTRY_KEYWORDS[interest.toLowerCase()] || [];
    return keywords.some(keyword => industry.includes(keyword));
  });

  return relevantInterests.length > 0
    ? Math.round((relevantInterests.length / interests.length) * 20)
    : 0;
};

/**
 * Calculate work preferences score
 */
const calculateWorkPreferencesScore = (location: string | undefined, benefits: string[]): number => {
  if (!location) return 0;

  if (location === 'remote' && benefits.includes('Trabajo Remoto')) {
    return 10;
  } else if (location === 'hybrid' && (benefits.includes('Trabajo Remoto') || benefits.includes('Horarios Flexibles'))) {
    return 10;
  } else if (location === 'office') {
    return 8; // Most companies offer office work
  }

  return 0;
}; 