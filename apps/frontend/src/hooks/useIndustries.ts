import { useState, useEffect } from 'react';
import { Industry } from '../types/api.types';
import industryService from '../services/api/industryService';
import { useApi } from '../contexts/ApiContext';

// Hook for fetching all industries
export function useIndustries() {
  return useApi<Industry[]>('industries.all', () => industryService.getIndustries());
}

// Legacy approach without context (for backwards compatibility)
export function useIndustriesLegacy() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      setLoading(true);
      try {
        const data = await industryService.getIndustries();
        setIndustries(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch industries'));
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return { industries, loading, error };
}
