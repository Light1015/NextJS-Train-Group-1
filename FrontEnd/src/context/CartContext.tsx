'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCartFetchFromAPI, CartItem } from '@/hooks/useCartFetchFromAPI';

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: string, color: string, amount: number) => void;
  removeItem: (id: number, size: string, color: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { items: fetchedItems, setItems, loading } = useCartFetchFromAPI();
  const [items, setLocalItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!loading) {
      console.log("✅ fetchedItems from API:", fetchedItems);
      setLocalItems(fetchedItems);
    }
  }, [fetchedItems, loading]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log("🛡️ Token đang dùng:", token);

  const addToCart = async (newItem: CartItem) => {
    if (!token) return;

    try {
      const res = await axios.post<CartItem>(
        "http://localhost:8000/api/cart/",
        {
          product: newItem.product_id, // ✅ BẮT BUỘC phải dùng "product"
          size: newItem.size,
          color: newItem.color,
          quantity: newItem.quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Nếu sản phẩm đã tồn tại, update lại item đó, không thêm mới
      setLocalItems(prev => {
        const exists = prev.find(
          item =>
            item.product_id === newItem.product_id &&
            item.size === newItem.size &&
            item.color === newItem.color
        );
        if (exists) {
          return prev.map(item =>
            item.product_id === newItem.product_id &&
              item.size === newItem.size &&
              item.color === newItem.color
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          return [...prev, res.data];
        }
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const updateQuantity = async (id: number, size: string, color: string, amount: number) => {
    if (!token) return;

    const existing = items.find(
      item => item.id === id && item.size === size && item.color === color
    );

    if (!existing) return;

    const newQty = Math.max(1, existing.quantity + amount);

    try {
      const res = await axios.put<CartItem>(
        `http://localhost:8000/api/cart/${id}/`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalItems(prev =>
        prev.map(item => item.id === id ? res.data : item)
      );
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const removeItem = async (id: number, size: string, color: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8000/api/cart/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLocalItems(prev =>
        prev.filter(item => !(item.id === id && item.size === size && item.color === color))
      );
    } catch (err) {
      console.error("Remove item failed:", err);
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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
