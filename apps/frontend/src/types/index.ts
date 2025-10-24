import React from 'react';

/**
 * Route types
 */
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  protected?: boolean;
  layout?: 'main' | 'none';
  exact?: boolean;
}

/**
 * Navigation types
 */
export interface NavItem {
  title: string;
  path: string;
  icon?: string;
}

/**
 * Common component types
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Form types
 */
export interface PersonalInfo {
  name?: string;
  email?: string;
  career?: string;
  semester?: string;
  university?: string;
  level?: string;
}

export interface CompanyPreferences {
  size?: 'startup' | 'medium' | 'large';
  culture?: string;
  benefits?: string;
}

export interface WorkPreferences {
  location?: 'remote' | 'hybrid' | 'office';
  schedule?: 'full-time' | 'part-time';
  salary?: string;
}

export interface UserProfile {
  personalInfo?: PersonalInfo;
  interests?: string[];
  companyPreferences?: CompanyPreferences;
  workPreferences?: WorkPreferences;
}

export interface FormStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export interface FormStep {
  id: number;
  title: string;
  subtitle: string;
  component: React.ComponentType<FormStepProps>;
}

/**
 * Company types
 */
export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  size: 'startup' | 'medium' | 'large';
  culture: string[];
  benefits: string[];
  industry: string;
  location: string;
  openPositions: string[];
  rating: number;
  website: string;
  matchPercentage?: number;
} 