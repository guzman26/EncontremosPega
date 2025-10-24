import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiContextState {
  status: Record<string, ApiStatus>;
  errors: Record<string, Error | null>;
  cache: Record<string, { data: any; timestamp: number }>;
}

interface ApiContextValue extends ApiContextState {
  setLoading: (key: string) => void;
  setSuccess: (key: string, data?: any) => void;
  setError: (key: string, error: Error) => void;
  clearError: (key: string) => void;
  getCachedData: <T>(key: string, maxAge?: number) => T | null;
  clearCache: (key?: string) => void;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

// Cache expiration time (15 minutes)
const DEFAULT_CACHE_MAX_AGE = 15 * 60 * 1000;

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ApiContextState>({
    status: {},
    errors: {},
    cache: {},
  });

  const setLoading = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      status: { ...prev.status, [key]: 'loading' },
      errors: { ...prev.errors, [key]: null },
    }));
  }, []);

  const setSuccess = useCallback((key: string, data?: any) => {
    setState((prev) => {
      const newState = {
        ...prev,
        status: { ...prev.status, [key]: 'success' },
        errors: { ...prev.errors, [key]: null },
      };

      // If data is provided, update the cache
      if (data !== undefined) {
        newState.cache = {
          ...prev.cache,
          [key]: { data, timestamp: Date.now() },
        };
      }

      return newState;
    });
  }, []);

  const setError = useCallback((key: string, error: Error) => {
    setState((prev) => ({
      ...prev,
      status: { ...prev.status, [key]: 'error' },
      errors: { ...prev.errors, [key]: error },
    }));
  }, []);

  const clearError = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [key]: null },
    }));
  }, []);

  const getCachedData = useCallback(
    <T,>(key: string, maxAge: number = DEFAULT_CACHE_MAX_AGE): T | null => {
      const cachedItem = state.cache[key];
      if (!cachedItem) return null;

      const isExpired = Date.now() - cachedItem.timestamp > maxAge;
      return isExpired ? null : (cachedItem.data as T);
    },
    [state.cache]
  );

  const clearCache = useCallback(
    (key?: string) => {
      if (key) {
        setState((prev) => ({
          ...prev,
          cache: { ...prev.cache, [key]: undefined },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          cache: {},
        }));
      }
    },
    []
  );

  return (
    <ApiContext.Provider
      value={{
        ...state,
        setLoading,
        setSuccess,
        setError,
        clearError,
        getCachedData,
        clearCache,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Hook for using the API context
export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};

// Custom hook for API operations
export function useApi<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    cacheTime?: number;
  }
) {
  const { status, errors, setLoading, setSuccess, setError, getCachedData } =
    useApiContext();
  
  const cachedData = getCachedData<T>(key, options?.cacheTime);
  const apiStatus = status[key] || 'idle';
  const error = errors[key] || null;

  const execute = useCallback(async () => {
    try {
      setLoading(key);
      const data = await fetchFn();
      setSuccess(key, data);
      options?.onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(key, error);
      options?.onError?.(error);
      throw error;
    }
  }, [fetchFn, key, setLoading, setSuccess, setError, options]);

  return {
    execute,
    status: apiStatus,
    isLoading: apiStatus === 'loading',
    isSuccess: apiStatus === 'success',
    isError: apiStatus === 'error',
    error,
    data: cachedData,
  };
}
