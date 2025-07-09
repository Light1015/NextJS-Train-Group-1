import { useEffect, useState } from "react";
import axios from "axios";

export interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  product_id: number;
}

interface CartAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
}

export const useCartFetchFromAPI = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchCart = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get<CartAPIResponse>(
          `${apiUrl}/cart/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(res.data.results);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return { items, setItems, loading };
};
