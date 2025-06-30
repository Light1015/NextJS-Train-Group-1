import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product.types';

const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    axios
      .get<Product>(`http://localhost:8000/product/products/${id}/`, {
        signal: controller.signal,
      })

      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
        console.error('Failed to load product:', err);
        setError('Failed to load product');
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { product, loading, error };
};

export default useProductDetail;
