const technology = require('../apps/backend/src/data/companies/technology.json');
const banking = require('../apps/backend/src/data/companies/banking.json');
const healthcare = require('../apps/backend/src/data/companies/healthcare.json');
const ecommerce = require('../apps/backend/src/data/companies/ecommerce.json');
const fintech = require('../apps/backend/src/data/companies/fintech.json');
const consulting = require('../apps/backend/src/data/companies/consulting.json');
const education = require('../apps/backend/src/data/companies/education.json');
const energy = require('../apps/backend/src/data/companies/energy.json');
const retail = require('../apps/backend/src/data/companies/retail.json');
const logistics = require('../apps/backend/src/data/companies/logistics.json');
const automotive = require('../apps/backend/src/data/companies/automotive.json');
const insurance = require('../apps/backend/src/data/companies/insurance.json');
const media = require('../apps/backend/src/data/companies/media.json');
const mining = require('../apps/backend/src/data/companies/mining.json');
const telecommunications = require('../apps/backend/src/data/companies/telecommunications.json');

const allCompanies = [
  ...technology,
  ...banking,
  ...healthcare,
  ...ecommerce,
  ...fintech,
  ...consulting,
  ...education,
  ...energy,
  ...retail,
  ...logistics,
  ...automotive,
  ...insurance,
  ...media,
  ...mining,
  ...telecommunications,
];

function generateMatchReasons(company, interests, culture, benefits) {
  const reasons = [];
  
  if (interests && Array.isArray(interests) && interests.includes(company.industry)) {
    reasons.push(`Tu industria de interés: ${company.industry}`);
  }
  
  if (culture && company.cultureValues && Array.isArray(company.cultureValues) && company.cultureValues.includes(culture)) {
    reasons.push(`Alineación cultural: ${culture}`);
  }
  
  if (benefits && company.benefits && Array.isArray(company.benefits) && company.benefits.includes(benefits)) {
    reasons.push(`Beneficio que buscas: ${benefits}`);
  }
  
  if (reasons.length === 0) {
    reasons.push('Empresa con buenas oportunidades');
  }
  
  return reasons;
}

module.exports = function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { interests, culture, benefits, salary } = req.body;

      // Calcular match score para cada empresa
      const recommendedCompanies = allCompanies
        .map(company => {
          let score = 0;
          
          // Match por industria/intereses
          if (interests && Array.isArray(interests) && interests.includes(company.industry)) {
            score += 30;
          }
          
          // Match por cultura
          if (culture && company.cultureValues && Array.isArray(company.cultureValues) && company.cultureValues.includes(culture)) {
            score += 25;
          }
          
          // Match por beneficios
          if (benefits && company.benefits && Array.isArray(company.benefits) && company.benefits.includes(benefits)) {
            score += 25;
          }
          
          // Bonus aleatorio por relevancia
          score += Math.floor(Math.random() * 20);
          
          return {
            ...company,
            matchScore: Math.min(score, 100),
            matchReasons: generateMatchReasons(company, interests, culture, benefits)
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10);

      const summary = {
        totalMatches: allCompanies.length,
        strongMatches: recommendedCompanies.filter(c => c.matchScore >= 80).length,
        goodMatches: recommendedCompanies.filter(c => c.matchScore >= 60).length,
      };

      res.status(200).json({
        summary,
        companies: recommendedCompanies,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error calculating recommendations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
