"use client";

import React from "react";
import products from "@/constants/products"; // Nếu chuyển sang fetch API thì đổi
import ProductCard from "@/components/UI/ProductCard/ProductCard";

const Product = () => {
    // Kiểm tra sản phẩm có tồn tại và là mảng không
    const topProducts = Array.isArray(products) ? products.slice(0, 4) : [];

    return (
        <div className="container my-5 pb-5">
            <h2 className="text-center font-[Integral_CF] font-bold text-[48px] mb-4">
                YOU MIGHT ALSO LIKE
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topProducts.map((product) => {
                    const numericPrice =
                        typeof product.price === "string"
                            ? parseFloat(product.price.replace("$", ""))
                            : product.price;

                    return (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: numericPrice,
                                old_price: undefined,
                                discount: undefined,
                                rating: product.rating,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Product;
