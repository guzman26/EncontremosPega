/**
 * Recommendation service to handle match calculation logic
 */

/**
 * Calculate match percentage between user profile and company
 * @param {Object} profile - User profile with preferences
 * @param {Object} company - Company to match against
 * @returns {number} - Match percentage (0-100)
 */
export const calculateMatchPercentage = (profile, company) => {
  let score = 0;
  let maxScore = 0;

  // Interest/Tag alignment (40 points) - Highest weight
  maxScore += 40;
  if (profile.interests?.length > 0 && company.tags) {
    const matchingInterests = profile.interests.filter(interest => 
      company.tags.includes(interest)
    );
    
    if (matchingInterests.length > 0) {
      const interestScore = (matchingInterests.length / profile.interests.length) * 40;
      score += interestScore;
    }
  }

  // Company size preference (20 points)
  maxScore += 20;
  if (profile.companyPreferences?.size === company.size) {
    score += 20;
  } else if (profile.companyPreferences?.size === 'medium' && 
             ['startup', 'large'].includes(company.size)) {
    score += 12; // Partial match
  } else if (profile.companyPreferences?.size === 'startup' && company.size === 'medium') {
    score += 10; // Partial match for similar culture
  }

  // Culture match (20 points)
  maxScore += 20;
  if (profile.companyPreferences?.culture && company.culture) {
    const userCulture = profile.companyPreferences.culture;
    const cultureMatch = company.culture.includes(userCulture);
    if (cultureMatch) {
      score += 20;
    } else {
      // Partial matches for related cultures
      const cultureCompatibility = {
        'Innovación y Tecnología': ['Work-Life Balance', 'Autonomía', 'Crecimiento Profesional'],
        'Work-Life Balance': ['Horarios Flexibles', 'Autonomía', 'Trabajo Remoto'],
        'Crecimiento Profesional': ['Innovación y Tecnología', 'Mentorship', 'Capacitación'],
        'Trabajo en Equipo': ['Diversidad e Inclusión', 'Crecimiento Profesional'],
        'Autonomía': ['Work-Life Balance', 'Innovación y Tecnología']
      };
      
      const compatibleCultures = cultureCompatibility[userCulture] || [];
      const hasCompatibleCulture = company.culture.some(culture => 
        compatibleCultures.includes(culture)
      );
      
      if (hasCompatibleCulture) {
        score += 10; // Partial culture match
      }
    }
  }

  // Benefits match (15 points)
  maxScore += 15;
  if (profile.companyPreferences?.benefits && company.benefits) {
    const userBenefit = profile.companyPreferences.benefits;
    const benefitMatch = company.benefits.includes(userBenefit);
    if (benefitMatch) {
      score += 15;
    }
  }

  // Work preferences (5 points)
  maxScore += 5;
  if (profile.workPreferences?.location === 'remote' && 
      company.benefits?.includes('Trabajo Remoto')) {
    score += 5;
  } else if (profile.workPreferences?.location === 'hybrid' && 
            (company.benefits?.includes('Trabajo Remoto') || 
             company.benefits?.includes('Horarios Flexibles'))) {
    score += 5;
  }

  // Calculate final percentage
  const matchPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return matchPercentage;
};

/**
 * Generate recommendations based on user profile
 * @param {Object} userProfile - User profile with preferences
 * @param {Array} companies - List of all companies
 * @param {number} limit - Maximum number of recommendations to return
 * @returns {Object} - Recommendations and stats
 */
export const generateRecommendations = (userProfile, companies, limit = 8) => {
  // Calculate match percentages for all companies
  const companiesWithMatch = companies.map(company => ({
    ...company,
    matchPercentage: calculateMatchPercentage(userProfile, company)
  }));
  
  // Sort by match percentage (descending)
  companiesWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Get top matches up to the limit
  const topRecommendations = companiesWithMatch.slice(0, limit);
  
  // Generate statistics
  const stats = {
    averageMatch: Math.round(
      topRecommendations.reduce((sum, comp) => sum + comp.matchPercentage, 0) / 
      topRecommendations.length
    ),
    topMatch: topRecommendations[0]?.matchPercentage || 0,
    userInterests: userProfile.interests || [],
    industries: [...new Set(topRecommendations.map(comp => comp.industry))]
  };
  
  return {
    recommendations: topRecommendations,
    stats
  };
};
