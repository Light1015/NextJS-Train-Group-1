// services/cartApi.ts
import axios from 'axios';

export interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export const getCartItems = () => {
  return axios.get<CartItem[]>('/api/cart/'); // <- chú ý kiểu trả về
};

export const addCartItem = (item: CartItem) => {
  return axios.post('/api/cart/', item);
};

export const updateCartItem = (id: number, data: Partial<CartItem>) => {
  return axios.patch(`/api/cart/${id}/`, data);
};

export const deleteCartItem = (id: number) => {
  return axios.delete(`/api/cart/${id}/`);
};
