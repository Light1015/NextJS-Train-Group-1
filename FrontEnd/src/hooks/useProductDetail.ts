import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product.types';

const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    axios.get(`${process.env.NEXT_PUBLIC_API}/products/${id}/`)
      .then((res) => {
        setProduct(res.data as Product);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load product:', err);
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
};

export default useProductDetail;