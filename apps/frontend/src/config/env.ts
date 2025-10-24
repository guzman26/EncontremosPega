/**
 * Environment configuration
 */

interface EnvConfig {
  apiBaseUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const env: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default env;
