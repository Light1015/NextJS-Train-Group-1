export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  discount?: string | null;
  rating: number;
  colors: { id: number; name: string }[];
  sizes: { id: number; name: string }[];
};
