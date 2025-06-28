import { RouteConfig } from '../types';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import OnboardingPage from '../pages/OnboardingPage';
import RecommendationsPage from '../pages/RecommendationsPage';
import AdminPage from '../pages/AdminPage';

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: LandingPage,
    title: 'EncuentraPega - Encuentra tu trabajo ideal',
  },
  {
    path: '/home',
    element: HomePage,
    title: 'Inicio - EncuentraPega',
  },
  {
    path: '/onboarding',
    element: OnboardingPage,
    title: 'Perfil - EncuentraPega',
  },
  {
    path: '/recommendations',
    element: RecommendationsPage,
    title: 'Recomendaciones - EncuentraPega',
  },
  {
    path: '/about',
    element: AboutPage,
    title: 'Acerca de - EncuentraPega',
  },
  {
    path: '/contact',
    element: ContactPage,
    title: 'Contacto - EncuentraPega',
  },
  {
    path: '/admin-add-company',
    element: AdminPage,
    title: 'Admin Panel - EncuentraPega',
    protected: true, // This route won't appear in navigation
  },
];

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.protected);
};

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter(route => !route.protected);
}; 