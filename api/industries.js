import technology from '../apps/backend/src/data/companies/technology.json' assert { type: 'json' };
import banking from '../apps/backend/src/data/companies/banking.json' assert { type: 'json' };
import healthcare from '../apps/backend/src/data/companies/healthcare.json' assert { type: 'json' };
import ecommerce from '../apps/backend/src/data/companies/ecommerce.json' assert { type: 'json' };
import fintech from '../apps/backend/src/data/companies/fintech.json' assert { type: 'json' };
import consulting from '../apps/backend/src/data/companies/consulting.json' assert { type: 'json' };
import education from '../apps/backend/src/data/companies/education.json' assert { type: 'json' };
import energy from '../apps/backend/src/data/companies/energy.json' assert { type: 'json' };
import retail from '../apps/backend/src/data/companies/retail.json' assert { type: 'json' };
import logistics from '../apps/backend/src/data/companies/logistics.json' assert { type: 'json' };
import automotive from '../apps/backend/src/data/companies/automotive.json' assert { type: 'json' };
import insurance from '../apps/backend/src/data/companies/insurance.json' assert { type: 'json' };
import media from '../apps/backend/src/data/companies/media.json' assert { type: 'json' };
import mining from '../apps/backend/src/data/companies/mining.json' assert { type: 'json' };
import telecommunications from '../apps/backend/src/data/companies/telecommunications.json' assert { type: 'json' };

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

export default function handler(req, res) {
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
}
