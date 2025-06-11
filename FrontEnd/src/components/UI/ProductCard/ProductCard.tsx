import React from "react";
import StarsRating from "./StarsRating";
import Link from "next/link";

interface Product {
    id: string | number;
    name: string;
    image: string;
    rating: number;
    price: string | number;
    oldPrice?: string | number;
    discount?: string | number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div key={product.id}>
            <Link href={`/product/${product.id}`}>
                <div className="w-full h-80 bg-[#f0eeed] rounded-2xl mb-4 overflow-hidden cursor-pointer">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-auto object-fill"
                    />
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <StarsRating rating={product.rating} showRating={true} />

                <div className="mt-2">
                    <span className="text-xl font-medium">{product.price}</span>
                    {product.oldPrice && (
                        <span className="text-gray-500 line-through ml-2">
                            {product.oldPrice}
                        </span>
                    )}
                    {product.discount && (
                        <span className="ml-2 text-red-500 rounded-full text-xs bg-red-100 p-1">
                            -{product.discount}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
