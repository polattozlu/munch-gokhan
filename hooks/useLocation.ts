
'use client';

import { useState } from 'react';
import { mapsApi, LocationData } from '@/lib/maps';

interface UseLocationReturn {
  userLocation: LocationData | null;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  searchLocation: (address: string) => Promise<LocationData | null>;
}

export const useLocation = (): UseLocationReturn => {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await mapsApi.getCurrentLocation();
      if (location) {
        setUserLocation(location);
      } else {
        setError('Konum izni alınamadı');
      }
    } catch (err) {
      setError('Konum alınırken bir hata oluştu');
      console.error('Location error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (address: string): Promise<LocationData | null> => {
    try {
      setLoading(true);
      setError(null);
      const location = await mapsApi.geocodeAddress(address);
      if (location) {
        setUserLocation(location);
        return location;
      } else {
        setError('Adres bulunamadı');
        return null;
      }
    } catch (err) {
      setError('Adres arama sırasında hata oluştu');
      console.error('Address search error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    userLocation,
    loading,
    error,
    getCurrentLocation,
    searchLocation
  };
};
