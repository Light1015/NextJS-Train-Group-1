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
        <div className={`card h-100 position-relative ${styles.productCard}`}>
            <Link href={`/product/${product.id}`}>
                <div className={styles.productImage}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={295}
                        height={298}
                    />

                </div>
                <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>{product.name}</h5>
                    <div className={styles.rating}>
                        <StarsRating rating={product.rating} showRating={true} />
                    </div>
                    <div className={`${styles.priceWrapper} mt-2`}>
                        <span className={styles.price}>{product.price}</span>
                        {product.oldPrice && (
                            <span className={styles.oldPrice}>{product.oldPrice}</span>
                        )}
                        {product.discount && (
                            <span className={styles.discount}>-{product.discount}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default ProductCard;
