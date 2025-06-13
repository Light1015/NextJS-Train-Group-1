
export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: string;
};


const products: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/images/products/image7.png",
    price: "$120",
    rating: "4.5",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/images/products/image8.png",
    price: "$240",
    oldPrice: "$260",
    discount: "20%",
    rating: "3.5",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "/images/products/image9.png",
    price: "$180",
    rating: "4.5",
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/images/products/image10.png",
    price: "$130",
    oldPrice: "$160",
    discount: "30%",
    rating: "4",
  },
  {
    id: 5,
    name: "T-shirt with Tape Details",
    image: "/images/products/image11.png",
    price: "$120",
    rating: "4.5",
  },
  {
    id: 6,
    name: "Skinny Fit Jeans",
    image: "/images/products/image12.png",
    price: "$240",
    oldPrice: "$260",
    discount: "20%",
    rating: "3.5",
  },
  {
    id: 7,
    name: "Checkered Shirt",
    image: "/images/products/image13.png",
    price: "$180",
    rating: "4.5",
  },
  {
    id: 8,
    name: "Sleeve Striped T-shirt",
    image: "/images/products/image14.png",
    price: "$130",
    oldPrice: "$160",
    discount: "30%",
    rating: "4",
  },
  {
    id: 9,
    name: "T-shirt with Tape Details",
    image: "/images/products/image15.png",
    price: "$120",
    rating: "4.5",
  },
  {
    id: 10,
    name: "Skinny Fit Jeans",
    image: "/images/products/image16.png",
    price: "$240",
    oldPrice: "$260",
    discount: "20%",
    rating: "3.5",
  },
  {
    id: 11,
    name: "Checkered Shirt",
    image: "/images/products/image17.png",
    price: "$180",
    rating: "4.5",
  },
  {
    id: 12,
    name: "Sleeve Striped T-shirt",
    image: "/images/products/image18.png",
    price: "$130",
    oldPrice: "$160",
    discount: "30%",
    rating: "4",
  },
];
export default products;
