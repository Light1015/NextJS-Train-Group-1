'use client';
import React, { createContext, useContext, useEffect } from 'react';
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
  const { items, setItems, loading } = useCartFetchFromAPI();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log("🛡️ Token đang dùng:", token);

  const addToCart = async (newItem: CartItem) => {
    if (!token) return;

    try {
      const res = await axios.post<CartItem>(
        "http://localhost:8000/api/cart/",
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Cập nhật danh sách item sau khi thêm
      setItems((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
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
      const res = await axios.patch<CartItem>(  // ✅ Đổi từ PUT ➜ PATCH
        `http://localhost:8000/api/cart/${id}/`,
        { quantity: newQty },  // ✅ Chỉ gửi quantity
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Cập nhật local state
      setItems(prev =>
        prev.map(item =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: res.data.quantity }
            : item
        )
      );
    } catch (err: any) {
      console.error("❌ Update quantity failed:", err.response?.data || err);
    }
  };


  const removeItem = async (id: number, size: string, color: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8000/api/cart/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(prev =>
        prev.filter(item =>
          !(item.id === id && item.size === size && item.color === color)
        )
      );
    } catch (err) {
      console.error("❌ Remove item failed:", err);
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
