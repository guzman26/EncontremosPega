import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Retrieves all companies from all industry files
 * @returns {Array} Array of company objects
 */
export const getAllCompanies = () => {
  try {
    const companiesDir = path.join(__dirname, '..', config.paths.companiesDir);
    let allCompanies = [];
    
    // Read all JSON files in the companies directory
    const files = fs.readdirSync(companiesDir).filter(file => file.endsWith('.json'));
    
    files.forEach(file => {
      const filePath = path.join(companiesDir, file);
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

/**
 * Gets companies by industry
 * @param {string} industry - Industry name
 * @returns {Array} Array of companies in the specified industry
 */
export const getCompaniesByIndustry = (industry) => {
  try {
    const industryFile = industry.toLowerCase();
    const filePath = path.join(__dirname, '..', config.paths.companiesDir, `${industryFile}.json`);
    
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading companies for industry ${industry}:`, error);
    return [];
  }
};

/**
 * Gets a single company by ID
 * @param {string} id - Company ID
 * @returns {Object|null} Company object or null if not found
 */
export const getCompanyById = (id) => {
  const companies = getAllCompanies();
  return companies.find(company => company.id === id) || null;
};

/**
 * Creates a new company and adds it to the appropriate industry file
 * @param {Object} companyData - Company data
 * @returns {Object} Created company object
 */
export const createCompany = (companyData) => {
  const {
    name,
    logo,
    description,
    industry,
    size,
    location,
    culture,
    benefits,
    openPositions,
    rating,
    website,
    tags
  } = companyData;

  // Generate unique ID
  const existingCompanies = getAllCompanies();
  const industryCompanies = existingCompanies.filter(
    c => c.industry.toLowerCase() === industry.toLowerCase()
  );
  const nextId = industryCompanies.length + 1;
  const companyId = `${industry.toLowerCase()}-${nextId}`;

  // Create company object
  const newCompany = {
    id: companyId,
    name: name.trim(),
    logo: logo || `https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center`,
    description: description.trim(),
    industry: industry.charAt(0).toUpperCase() + industry.slice(1).toLowerCase(),
    size: size.toLowerCase(),
    location: location.trim(),
    culture: Array.isArray(culture) ? culture : culture ? [culture] : [],
    benefits: Array.isArray(benefits) ? benefits : benefits ? [benefits] : [],
    openPositions: Array.isArray(openPositions) ? openPositions : openPositions ? [openPositions] : [],
    rating: rating ? parseFloat(rating) : 4.0,
    website: website || `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
    tags: Array.isArray(tags) ? tags : tags ? tags.split(',').map(t => t.trim()) : []
  };

  // Read existing companies from industry file
  const industryFile = industry.toLowerCase();
  const filePath = path.join(__dirname, '..', config.paths.companiesDir, `${industryFile}.json`);
  
  let companies = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    companies = JSON.parse(data);
  }

  // Add new company and save to file
  companies.push(newCompany);
  fs.writeFileSync(filePath, JSON.stringify(companies, null, 2));

  return newCompany;
};

/**
 * Gets all available industries with their counts
 * @returns {Array} Array of industry objects with id, name and count
 */
export const getIndustries = () => {
  try {
    const companiesDir = path.join(__dirname, '..', config.paths.companiesDir);
    const industries = [];
    const industryNames = {
      'fintech': 'FinTech',
      'banking': 'Banca',
      'ecommerce': 'E-Commerce',
      'foodtech': 'FoodTech',
      'hrtech': 'HRTech',
      'consulting': 'Consultoría',
      'telecommunications': 'Telecomunicaciones',
      'mining': 'Minería',
      'retail': 'Retail'
    };
    
    // Read all industry files available
    const files = fs.readdirSync(companiesDir).filter(file => file.endsWith('.json'));
    
    files.forEach(file => {
      const filePath = path.join(companiesDir, file);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const companies = JSON.parse(data);
        
        const industryId = file.replace('.json', '');
        
        industries.push({
          id: industryId,
          name: industryNames[industryId] || industryId,
          count: companies.length
        });
      }
    });
    
    // Sort by name
    industries.sort((a, b) => a.name.localeCompare(b.name));
    
    return industries;
  } catch (error) {
    console.error('Error fetching industries:', error);
    return [];
  }
};
