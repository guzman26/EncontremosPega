import { useState, useEffect } from 'react';
import { Company } from '../types/api.types';
import companyService from '../services/api/companyService';
import { useApi } from '../contexts/ApiContext';

// Hook for fetching all companies
export function useAllCompanies() {
  return useApi<Company[]>('companies.all', () => companyService.getAllCompanies());
}

// Hook for fetching a specific company by ID
export function useCompany(id: string) {
  return useApi<Company>(
    `companies.${id}`, 
    () => companyService.getCompanyById(id),
    { enabled: !!id }
  );
}

// Hook for fetching companies by industry
export function useCompaniesByIndustry(industry: string) {
  return useApi<Company[]>(
    `companies.industry.${industry}`,
    () => companyService.getCompaniesByIndustry(industry),
    { enabled: !!industry }
  );
}

// Legacy approach without context (keeping for backwards compatibility)
export function useCompaniesLegacy() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await companyService.getAllCompanies();
        setCompanies(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch companies'));
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
}
