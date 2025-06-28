import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(express.json());

// Función para leer datos de empresas de múltiples archivos
const getCompanies = () => {
  try {
    const companiesDir = path.join(__dirname, 'data', 'companies');
    const industries = [
      'fintech', 'banking', 'ecommerce', 'foodtech', 
      'hrtech', 'consulting', 'telecommunications', 
      'mining', 'retail'
    ];
    
    let allCompanies = [];
    
    industries.forEach(industry => {
      const filePath = path.join(companiesDir, `${industry}.json`);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const companies = JSON.parse(data);
        allCompanies = allCompanies.concat(companies);
      }
    });
    
    return allCompanies;
  } catch (error) {
    console.error('Error reading companies data:', error);
    return [];
  }
};

// Función para calcular match de recomendaciones mejorada
const calculateMatchPercentage = (profile, company) => {
  let score = 0;
  let maxScore = 0;

  // Interest/Tag alignment (40 points) - Mayor peso
  maxScore += 40;
  if (profile.interests && profile.interests.length > 0 && company.tags) {
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
  } else if (profile.companyPreferences?.size === 'medium' && (company.size === 'startup' || company.size === 'large')) {
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
  if (profile.workPreferences?.location === 'remote' && company.benefits?.includes('Trabajo Remoto')) {
    score += 5;
  } else if (profile.workPreferences?.location === 'hybrid' && 
             (company.benefits?.includes('Trabajo Remoto') || company.benefits?.includes('Horarios Flexibles'))) {
    score += 5;
  } else if (profile.workPreferences?.location === 'office') {
    score += 3; // Most companies offer office work
  }

  const percentage = Math.round((score / maxScore) * 100);
  return Math.min(100, Math.max(65, percentage)); // Minimum 65% para mejores matches
};

// ROUTES

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'EncontremosPega Backend',
    totalCompanies: getCompanies().length
  });
});

// Get all companies
app.get('/api/companies', (req, res) => {
  try {
    const companies = getCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
});

// Get companies by industry
app.get('/api/companies/industry/:industry', (req, res) => {
  try {
    const industry = req.params.industry;
    const filePath = path.join(__dirname, 'data', 'companies', `${industry}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const companies = JSON.parse(data);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies by industry' });
  }
});

// Get available industries
app.get('/api/industries', (req, res) => {
  try {
    const industries = [
      { id: 'fintech', name: 'Fintech', count: 0 },
      { id: 'banking', name: 'Banking', count: 0 },
      { id: 'ecommerce', name: 'E-commerce', count: 0 },
      { id: 'foodtech', name: 'FoodTech', count: 0 },
      { id: 'hrtech', name: 'HR Tech', count: 0 },
      { id: 'consulting', name: 'Consulting', count: 0 },
      { id: 'telecommunications', name: 'Telecomunicaciones', count: 0 },
      { id: 'mining', name: 'Minería', count: 0 },
      { id: 'retail', name: 'Retail', count: 0 }
    ];
    
    // Contar empresas por industria
    industries.forEach(industry => {
      const filePath = path.join(__dirname, 'data', 'companies', `${industry.id}.json`);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const companies = JSON.parse(data);
        industry.count = companies.length;
      }
    });
    
    res.json(industries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching industries' });
  }
});

// Get company by ID
app.get('/api/companies/:id', (req, res) => {
  try {
    const companies = getCompanies();
    const company = companies.find(c => c.id === req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching company' });
  }
});

// Get recommendations based on user profile
app.post('/api/recommendations', (req, res) => {
  try {
    const { userProfile, limit = 8 } = req.body;
    
    if (!userProfile) {
      return res.status(400).json({ error: 'User profile is required' });
    }
    
    const companies = getCompanies();
    
    const companiesWithMatch = companies
      .map(company => ({
        ...company,
        matchPercentage: calculateMatchPercentage(userProfile, company),
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, limit);
    
    // Estadísticas de recomendaciones
    const stats = {
      totalCompanies: companies.length,
      recommendedCompanies: companiesWithMatch.length,
      averageMatch: Math.round(
        companiesWithMatch.reduce((sum, comp) => sum + comp.matchPercentage, 0) / companiesWithMatch.length
      ),
      topMatch: companiesWithMatch[0]?.matchPercentage || 0,
      userInterests: userProfile.interests || [],
      industries: [...new Set(companiesWithMatch.map(comp => comp.industry))]
    };
    
    res.json({
      recommendations: companiesWithMatch,
      stats
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Error generating recommendations' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`🏢 Companies API: http://localhost:${port}/api/companies`);
  console.log(`🏭 Industries API: http://localhost:${port}/api/industries`);
  
  // Log companies loaded
  const totalCompanies = getCompanies().length;
  console.log(`📈 Loaded ${totalCompanies} companies from multiple industries`);
}); 