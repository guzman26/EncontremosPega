/**
 * Configuration settings for the application
 */
export default {
  server: {
    port: process.env.PORT || 3001,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  },
  paths: {
    companiesDir: 'data/companies'
  },
  validIndustries: [
    'fintech', 'banking', 'ecommerce', 'foodtech', 
    'hrtech', 'consulting', 'telecommunications', 
    'mining', 'retail'
  ]
};
