
'use client';

import { useState, useEffect } from 'react';
import { api, Restaurant } from '@/lib/api';

interface UseRestaurantsReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  searchRestaurants: (query: string) => Promise<void>;
  refreshRestaurants: () => Promise<void>;
}

export const useRestaurants = (): UseRestaurantsReturn => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError('Restoranlar yüklenirken bir hata oluştu');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchRestaurants = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.searchRestaurants(query);
      setRestaurants(data);
    } catch (err) {
      setError('Arama sırasında bir hata oluştu');
      console.error('Error searching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRestaurants = async () => {
    await fetchRestaurants();
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    error,
    searchRestaurants,
    refreshRestaurants
  };
};
