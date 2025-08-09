
'use client';

import { useState, useEffect } from 'react';
import { api, MenuItem } from '@/lib/api';

interface UseMenuReturn {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  filterByCategory: (category: string) => void;
  refreshMenu: () => Promise<void>;
}

export const useMenu = (restaurantId: number): UseMenuReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMenuItems(restaurantId);
      setMenuItems(data);
      setAllMenuItems(data);
    } catch (err) {
      setError('Menü yüklenirken bir hata oluştu');
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category: string) => {
    if (category === 'tumunu') {
      setMenuItems(allMenuItems);
    } else {
      const filtered = allMenuItems.filter(item => item.category === category);
      setMenuItems(filtered);
    }
  };

  const refreshMenu = async () => {
    await fetchMenuItems();
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  return {
    menuItems,
    loading,
    error,
    filterByCategory,
    refreshMenu
  };
};
