
'use client';

import { useState, useEffect } from 'react';
import { api, Order } from '@/lib/api';
import { getUserId } from '@/lib/utils';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  activeOrders: Order[];
  completedOrders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'userId'>) => Promise<Order | null>;
  refreshOrders: () => Promise<void>;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = getUserId();
      const data = await api.getOrdersByUserId(userId);
      setOrders(data);
    } catch (err) {
      setError('Siparişler yüklenirken bir hata oluştu');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderDate' | 'userId'>): Promise<Order | null> => {
    try {
      setError(null);
      const userId = getUserId();
      const newOrder = await api.createOrder({
        ...orderData,
        userId
      });
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError('Sipariş oluşturulurken bir hata oluştu');
      console.error('Error creating order:', err);
      return null;
    }
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  const activeOrders = orders.filter(order => 
    order.status === 'preparing' || order.status === 'on-the-way'
  );

  const completedOrders = orders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    activeOrders,
    completedOrders,
    createOrder,
    refreshOrders
  };
};
