
'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/lib/api';

interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: number;
}

interface UseCartReturn {
  items: CartItem[];
  addItem: (item: MenuItem & { restaurantId: number }, restaurantName?: string, onConfirm?: () => void) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (itemId: number) => number;
  getCartRestaurantId: () => number | null;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalData: {
    currentRestaurant: string;
    newRestaurant: string;
    pendingItem: (MenuItem & { restaurantId: number }) | null;
  };
  confirmCartChange: () => void;
}

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    currentRestaurant: '',
    newRestaurant: '',
    pendingItem: null as (MenuItem & { restaurantId: number }) | null
  });

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('munch-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          const validItems = parsedCart.filter((item: any) => 
            item.restaurantId && 
            item.id && 
            item.name && 
            item.price && 
            item.quantity
          );
          setItems(validItems);
          console.log('Cart loaded from localStorage:', validItems);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('munch-cart');
      } finally {
        setIsLoaded(true);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('munch-cart', JSON.stringify(items));
        console.log('Cart saved to localStorage:', items);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isLoaded]);

  const addItem = (item: MenuItem & { restaurantId: number }, restaurantName?: string, onConfirm?: () => void) => {
    if (!item.restaurantId) {
      console.error('Restaurant ID is required for cart item');
      return;
    }

    if (items.length > 0) {
      const cartRestaurantId = items[0].restaurantId;
      if (cartRestaurantId !== item.restaurantId) {
        const savedRestaurants = localStorage.getItem('munch-restaurants');
        let currentRestaurantName = 'Mevcut Restoran';
        let newRestaurantName = restaurantName || 'Yeni Restoran';

        if (savedRestaurants) {
          try {
            const restaurants = JSON.parse(savedRestaurants);
            const currentRestaurant = restaurants.find((r: any) => r.id === cartRestaurantId);
            const newRestaurant = restaurants.find((r: any) => r.id === item.restaurantId);

            if (currentRestaurant) currentRestaurantName = currentRestaurant.name;
            if (newRestaurant) newRestaurantName = newRestaurant.name;
          } catch (error) {
            console.error('Error parsing restaurants from localStorage:', error);
          }
        }

        setModalData({
          currentRestaurant: currentRestaurantName,
          newRestaurant: newRestaurantName,
          pendingItem: item
        });
        setShowModal(true);
        return;
      }
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        const updatedItems = currentItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('Updated item quantity:', updatedItems);
        return updatedItems;
      } else {
        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...currentItems, newItem];
        console.log('Added new item to cart:', newItem);
        return updatedItems;
      }
    });

    if (onConfirm) {
      onConfirm();
    }
  };

  const removeItem = (itemId: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(cartItem => cartItem.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        return currentItems.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return currentItems.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(currentItems => currentItems.filter(cartItem => cartItem.id !== itemId));
    } else {
      setItems(currentItems =>
        currentItems.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('munch-cart');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (itemId: number) => {
    const item = items.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getCartRestaurantId = () => {
    return items.length > 0 ? items[0].restaurantId : null;
  };

  const confirmCartChange = () => {
    if (modalData.pendingItem) {
      setItems([]);
      const newItem = { ...modalData.pendingItem, quantity: 1 };
      setItems([newItem]);
      console.log('Cart cleared and new item added:', newItem);
    }

    setShowModal(false);
    setModalData({
      currentRestaurant: '',
      newRestaurant: '',
      pendingItem: null
    });
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    getCartRestaurantId,
    showModal,
    setShowModal,
    modalData,
    confirmCartChange
  };
};
