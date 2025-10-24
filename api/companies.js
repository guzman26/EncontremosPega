import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Importar todos los archivos JSON de empresas
const dataPath = path.join(__dirname, '../apps/backend/src/data/companies');

function loadCompaniesData() {
  const files = fs.readdirSync(dataPath).filter(file => file.endsWith('.json'));
  const allCompanies = [];
  
  files.forEach(file => {
    try {
      const filePath = path.join(dataPath, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      allCompanies.push(...data);
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  });
  
  return allCompanies;
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
      const companies = loadCompaniesData();
      const { industry } = req.query;
      
      let filtered = companies;
      if (industry) {
        filtered = companies.filter(c => 
          c.industry.toLowerCase() === industry.toLowerCase()
        );
      }

      res.status(200).json(filtered);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error loading companies' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
