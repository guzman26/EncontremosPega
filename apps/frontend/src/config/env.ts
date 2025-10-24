/**
 * Environment configuration
 */

interface EnvConfig {
  apiBaseUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const getApiBaseUrl = (): string => {
  // Si existe variable de entorno, usar esa
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // En desarrollo: localhost:3001
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3001/api';
  }
  
  // En producción: usar las serverless functions de Vercel (misma URL)
  return '/api';
};

const env: EnvConfig = {
  apiBaseUrl: getApiBaseUrl(),
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default env;
