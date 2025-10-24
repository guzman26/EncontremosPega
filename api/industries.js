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

function getIndustries() {
  const industries = new Set();
  allCompanies.forEach(company => {
    if (company.industry) {
      industries.add(company.industry);
    }
  });
  return Array.from(industries).sort();
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

  if (req.method === 'GET') {
    try {
      const industries = getIndustries();
      res.status(200).json(industries);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error loading industries' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
