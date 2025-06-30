"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarsRating from "../StarsRating/StarsRating";
import { Product } from "@/types/product.types";

interface ProductProps {
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
        oldPrice?: number;
        discount?: string;
        rating: number;
    };
}


const ProductCard: React.FC<ProductProps> = ({ product }) => {
    return (
        <div key={product.id}>
            <Link href={`/product/${product.id}`}>
                {/* Product Image */}
                <div className="w-full aspect-square bg-[#f0eeed] rounded-2xl mb-4 overflow-hidden sm:rounded-[13.42px]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Name */}
                <h3
                    className="font-semibold text-sm truncate max-w-[155px] sm:max-w-[155px]"
                    title={product.name}
                >
                    {product.name}
                </h3>

                {/* Rating */}
                <StarsRating rating={product.rating} showRating={true} />

                {/* Prices */}
                <div className="mt-2 flex items-center gap-2 text-sm flex-wrap sm:flex-nowrap">
                    <span className="text-lg font-medium">${product.price}</span>
                    {product.oldPrice && (
                        <span className="text-gray-500 line-through">${product.oldPrice}</span>
                    )}
                    {product.discount && (
                        <span className="text-red-500 bg-red-100 text-xs rounded-full px-2 py-0.5">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </Link>
        </div>

    );
};

export default ProductCard;
