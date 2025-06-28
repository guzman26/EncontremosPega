import { UserProfile, Company } from '../types';
import { apiService } from '../services/api';

// Function to get companies from backend
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    return await apiService.getAllCompanies();
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};

// Function to get recommendations from backend
export const getRecommendedCompanies = async (userProfile: UserProfile): Promise<Company[]> => {
  try {
    // Transform frontend profile format to backend format
    const backendProfile = {
      email: userProfile.personalInfo?.email || '',
      name: userProfile.personalInfo?.name,
      location: userProfile.personalInfo?.university, // Use university as location for now
      interests: userProfile.interests || [],
      workPreferences: {
        location: mapWorkLocation(userProfile.workPreferences?.location),
        schedule: userProfile.workPreferences?.schedule,
      },
      companyPreferences: {
        size: mapCompanySize(userProfile.companyPreferences?.size),
        culture: mapCulture(userProfile.companyPreferences?.culture),
        benefits: mapBenefits(userProfile.companyPreferences?.benefits),
      },
    };

    return await apiService.getRecommendations(backendProfile, 6);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

// Mapping functions to convert frontend values to backend values
const mapWorkLocation = (location?: string): 'remote' | 'hybrid' | 'office' | undefined => {
  switch (location) {
    case 'remote': return 'remote';
    case 'hybrid': return 'hybrid';
    case 'office': return 'office';
    default: return undefined;
  }
};

const mapCompanySize = (size?: string): 'startup' | 'medium' | 'large' | undefined => {
  switch (size) {
    case 'startup': return 'startup';
    case 'medium': return 'medium';
    case 'large': return 'large';
    default: return undefined;
  }
};

const mapCulture = (culture?: string): string | undefined => {
  const cultureMap: Record<string, string> = {
    'innovation': 'Innovación y Tecnología',
    'work-life-balance': 'Work-Life Balance',
    'growth': 'Crecimiento Profesional',
    'collaboration': 'Trabajo en Equipo',
    'impact': 'Impacto Social',
    'autonomy': 'Autonomía',
  };
  return culture ? cultureMap[culture] || culture : undefined;
};

const mapBenefits = (benefits?: string): string | undefined => {
  const benefitsMap: Record<string, string> = {
    'remote': 'Trabajo Remoto',
    'learning': 'Capacitación y Cursos',
    'health': 'Seguro de Salud',
    'vacation': 'Vacaciones Flexibles',
    'bonus': 'Bonos por Desempeño',
    'equipment': 'Equipos de Trabajo',
  };
  return benefits ? benefitsMap[benefits] || benefits : undefined;
};

const calculateMatchPercentage = (profile: UserProfile, company: Company): number => {
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
  if (profile.interests && profile.interests.length > 0) {
    const industryKeywords = {
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

    const relevantInterests = profile.interests.filter(interest => {
      const keywords = industryKeywords[interest as keyof typeof industryKeywords] || [];
      return keywords.some(keyword => company.industry.includes(keyword));
    });

    if (relevantInterests.length > 0) {
      score += (relevantInterests.length / profile.interests.length) * 20;
    }
  }

  // Work preferences (10 points)
  maxScore += 10;
  if (profile.workPreferences?.location === 'remote' && company.benefits.includes('Trabajo Remoto')) {
    score += 10;
  } else if (profile.workPreferences?.location === 'hybrid' && (company.benefits.includes('Trabajo Remoto') || company.benefits.includes('Horarios Flexibles'))) {
    score += 10;
  } else if (profile.workPreferences?.location === 'office') {
    score += 8; // Most companies offer office work
  }

  // Ensure score is between 0-100
  const percentage = Math.round((score / maxScore) * 100);
  return Math.min(100, Math.max(60, percentage)); // Minimum 60% to ensure reasonable matches
}; 