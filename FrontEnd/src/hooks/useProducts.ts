import { useEffect, useState } from 'react'
import axios from 'axios'

export interface ProductItem {
  old_price: undefined;
  category: {
    id: number;
    name: string;
  };
  title: string
  id: number
  name: string
  image: string | null
  price: string
  rating: number
  colors: { id: number, name: string }[]
  sizes: { id: number, name: string }[]
  discount?: string
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

useEffect(() => {
  axios.get(`${apiUrl}/products/`, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  })
  .then(res => {
    const data = res.data as { results: ProductItem[] }
    setProducts(data.results)
    setLoading(false)
  })
  .catch(err => {
    console.error("Error loading products:", err)
    setLoading(false)
  })
}, [])


  return { products, loading }
}
