import axios from 'axios';

const API_URL = 'http://localhost:8000/cart';

export const useCart = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const getHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const addToCart = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/add/${productId}/`, null, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
      throw error;
    }
  };
  
  const getCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi khi lấy giỏ hàng:", error.response?.data || error.message);
      throw error;
    }
  };

  return {
    addToCart,
    getCart,

  };
};
