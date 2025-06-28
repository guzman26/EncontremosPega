// Application Constants
export const APP_NAME = 'EncontemosPega';
export const APP_VERSION = '1.0.0';

// API Constants
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Route Constants
export const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

// UI Constants
export const THEME_COLORS = {
  PRIMARY: '#646cff',
  PRIMARY_HOVER: '#535bf2',
  BACKGROUND: '#f5f5f5',
  WHITE: '#ffffff',
  TEXT_DARK: '#333333',
  TEXT_LIGHT: '#666666',
} as const; 