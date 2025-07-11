'use client';

import React, { createContext, useContext } from 'react';
import axios from 'axios';
import api from '@/hooks/axiosInstance';
import { useCartFetchFromAPI, CartItem } from '@/hooks/useCartFetchFromAPI';

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: string, color: string, amount: number) => void;
  removeItem: (id: number, size: string, color: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { items, setItems, loading } = useCartFetchFromAPI();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const commonHeaders = {
    Authorization: `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true',
  };

  const addToCart = async (newItem: CartItem) => {
    if (!token) return;

    try {
      const res = await api.post<CartItem>(
        `/cart/`,
        {
          product: newItem.product_id,
          name: newItem.name,
          price: newItem.price,
          size: newItem.size,
          color: newItem.color,
          quantity: newItem.quantity,
          image: newItem.image,
        },
        {
          headers: commonHeaders,
        }
      );

      setItems((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('❌ Add to cart failed:', err);
    }
  };

  const updateQuantity = async (id: number, size: string, color: string, amount: number) => {
    if (!token) return;

    const existing = items.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (!existing) return;

    const newQty = Math.max(1, existing.quantity + amount);

    try {
      const res = await api.put<CartItem>(
        `/cart/${id}/`,
        { quantity: newQty },
        { headers: commonHeaders }
      );

      setItems((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size && item.color === color ? res.data : item
        )
      );
    } catch (err) {
      console.error('❌ Update quantity failed:', err);
    }
  };

  const removeItem = async (id: number, size: string, color: string) => {
    if (!token) return;

    try {
      await api.delete(`/cart/${id}/`, {
        headers: commonHeaders,
      });

      setItems((prev) =>
        prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
      );
    } catch (err) {
      console.error('❌ Remove item failed:', err);
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
