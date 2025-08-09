'use client';

import { useState, useEffect } from 'react';
import { api, Review } from '@/lib/api';

interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  addReview: (review: Omit<Review, 'id' | 'date'>) => Promise<Review | null>;
  refreshReviews: () => Promise<void>;
}

export const useReviews = (restaurantId: number): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRestaurantReviews(restaurantId);
      setReviews(data);
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData: Omit<Review, 'id' | 'date'>): Promise<Review | null> => {
    try {
      setError(null);
      const newReview = await api.addReview(restaurantId, reviewData);
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      setError('Yorum eklenirken bir hata oluştu');
      console.error('Error adding review:', err);
      return null;
    }
  };

  const refreshReviews = async () => {
    await fetchReviews();
  };

  useEffect(() => {
    if (restaurantId) {
      fetchReviews();
    }
  }, [restaurantId]);

  return {
    reviews,
    loading,
    error,
    addReview,
    refreshReviews
  };
};