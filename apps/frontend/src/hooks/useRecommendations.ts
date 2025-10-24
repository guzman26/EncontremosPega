import { useState, useEffect } from 'react';
import { RecommendationsResponse, UserProfile } from '../types/api.types';
import recommendationService from '../services/api/recommendationService';
import { useApi } from '../contexts/ApiContext';

// Hook for fetching recommendations based on user profile
export function useRecommendations(userProfile: UserProfile | null, limit?: number) {
  return useApi<RecommendationsResponse>(
    `recommendations.${userProfile?.email || 'guest'}`,
    () => recommendationService.getRecommendations(userProfile || { email: 'guest@example.com' }, limit),
    { 
      enabled: !!userProfile,
      // Don't cache recommendations for too long as they may change
      cacheTime: 5 * 60 * 1000 // 5 minutes
    }
  );
}

// Function to get recommendations directly (not a hook)
export async function getRecommendations(userProfile: UserProfile, limit?: number) {
  try {
    return await recommendationService.getRecommendations(userProfile, limit);
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
}

// Legacy approach without context (keeping for backwards compatibility)
export function useRecommendationsLegacy(userProfile: UserProfile | null) {
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userProfile) return;
    
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const data = await recommendationService.getRecommendations(userProfile);
        setRecommendations(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recommendations'));
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userProfile]);

  return { recommendations, loading, error };
}
