"use client";

import React from "react";
import products from "@/constants/products";
import ProductCard from "@/components/UI/ProductCard/ProductCard";

const Product = () => {
    const topProducts = products.slice(0, 4);

    return (
        <div className="container my-5 pb-5">
            <h2 className="text-center font-family[Integral_CF] font-bold text-[48px] mb-4">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Product;