// Route types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  protected?: boolean;
}

// Navigation types
export interface NavItem {
  title: string;
  path: string;
  icon?: string;
}

// Common component types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export interface UserProfile {
  personalInfo?: {
    name?: string;
    email?: string;
    career?: string;
    semester?: string;
    university?: string;
  };
  interests?: string[];
  companyPreferences?: {
    size?: string;
    culture?: string;
    benefits?: string;
  };
  workPreferences?: {
    location?: string;
    schedule?: string;
    salary?: string;
  };
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