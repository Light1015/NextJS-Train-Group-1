export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  price: string | number; 
  old_price?: string | number | null;
  oldPrice?: string | number | null; 
  discount?: string | null;
  rating: number;
  colors: ({ id?: number; name: string } | string)[];
  sizes: ({ id?: number; name: string } | string)[];
  category?: { id: number; name: string }; 
};

