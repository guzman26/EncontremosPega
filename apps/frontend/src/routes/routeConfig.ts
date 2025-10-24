import type { RouteConfig } from '../types/route.types';

// Page imports
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import OnboardingPage from '../pages/OnboardingPage';
import RecommendationsPage from '../pages/RecommendationsPage';
import AdminPage from '../pages/AdminPage';
import CompaniesPage from '../pages/CompaniesPage';

/**
 * Public routes that don't require a layout
 */
const publicStandaloneRoutes: RouteConfig[] = [
  {
    path: '/',
    element: LandingPage,
    title: 'EncuentraPega - Encuentra tu trabajo ideal',
    layout: 'none',
  },
  {
    path: '/onboarding',
    element: OnboardingPage,
    title: 'Perfil - EncuentraPega',
    layout: 'none',
  },
  {
    path: '/recommendations',
    element: RecommendationsPage,
    title: 'Recomendaciones - EncuentraPega',
    layout: 'none',
  },
];

/**
 * Main application routes that use the main layout
 */
const mainAppRoutes: RouteConfig[] = [
  {
    path: '/home',
    element: HomePage,
    title: 'Inicio - EncuentraPega',
    layout: 'main',
  },
  {
    path: '/companies',
    element: CompaniesPage,
    title: 'Empresas - EncuentraPega',
    layout: 'main',
  },
  {
    path: '/about',
    element: AboutPage,
    title: 'Acerca de - EncuentraPega',
    layout: 'main',
  },
  {
    path: '/contact',
    element: ContactPage,
    title: 'Contacto - EncuentraPega',
    layout: 'main',
  },
];

/**
 * Admin routes (protected)
 */
const adminRoutes: RouteConfig[] = [
  {
    path: '/admin-add-company',
    element: AdminPage,
    title: 'Admin Panel - EncuentraPega',
    protected: true,
    layout: 'main',
  },
];

/**
 * Combine all routes
 */
export const routes: RouteConfig[] = [
  ...publicStandaloneRoutes,
  ...mainAppRoutes,
  ...adminRoutes,
];

/**
 * Helper functions for routes
 */

/**
 * Get a specific route by its path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find((route) => route.path === path);
};

/**
 * Get all protected routes (admin routes)
 */
export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter((route) => route.protected === true);
};

/**
 * Get all public routes
 */
export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter((route) => !route.protected);
};

/**
 * Get routes by layout type
 */
export const getRoutesByLayout = (layoutType: 'main' | 'none'): RouteConfig[] => {
  return routes.filter((route) => route.layout === layoutType);
};

/**
 * Navigation path constants for type-safe routing
 */
export const ROUTE_PATHS = {
  LANDING: '/',
  ONBOARDING: '/onboarding',
  RECOMMENDATIONS: '/recommendations',
  HOME: '/home',
  COMPANIES: '/companies',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN_COMPANIES: '/admin-add-company',
} as const;

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];