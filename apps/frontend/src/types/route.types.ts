/**
 * Route types for the application
 */
import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType;
  title: string;
  protected?: boolean;
  layout?: 'main' | 'none';
  exact?: boolean;
}

// Make the route metadata accessible through document title and meta tags
export interface RouteMetaProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}
