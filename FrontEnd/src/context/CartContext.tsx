'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCart as useCartAPI } from '@/hooks/useCart'; // 👈 Sử dụng đúng hook để lấy getCart

export interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: string, color: string, amount: number) => void;
  removeItem: (id: number, size: string, color: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { getCart } = useCartAPI(); // ✅ Gọi hook và destructure getCart

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        if (res?.items) {
          const mappedItems: CartItem[] = res.items.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            size: item.size || 'Default',
            color: item.color || 'Default',
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          }));
          setItems(mappedItems);
        }
      } catch (error) {
        console.error("❌ Không thể load giỏ hàng từ server:", error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const index = prev.findIndex(
        item =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: number, size: string, color: string, amount: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number, size: string, color: string) => {
    setItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size && item.color === color))
    );
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
