"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarsRating from "../StarsRating/StarsRating";
import styles from "./ProductCard.module.scss";

interface ProductProps {
    product: {
        id: number;
        name: string;
        image: string;
        price: string;
        oldPrice?: string;
        discount?: string;
        rating: number;
    };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className={`card h-100 ${styles.productCard}`}>
            <Link href={`/product/${product.id}`} className="text-decoration-none text-dark">
                <div className={`${styles.productImage}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="p-3"
                    />
                </div>
                <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>{product.name}</h5>
                    <StarsRating rating={product.rating} showRating={true} />
                    <div className="mt-2">
                        <span className="fw-bold me-2">{product.price}</span>
                        {product.oldPrice && (
                            <span className="text-muted text-decoration-line-through me-2">
                                {product.oldPrice}
                            </span>
                        )}
                        {product.discount && (
                            <span className="badge bg-danger text-white">-{product.discount}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
