"use client";

import React from "react";
import styles from "./Product.module.scss";
import products from "@/constants/products";

const Product = () => {
    const topProducts = products.slice(0, 4);

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">YOU MIGHT ALSO LIKE</h2>
            <div className="row">
                {topProducts.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-3 mb-4">
                        <div className={`card h-100 p-3 ${styles.cardCustom}`}>
                            <img
                                src={product.image}
                                className="card-img-top mb-3"
                                alt={product.name}
                            />
                            <div className="card-body p-0">
                                <h6 className="card-title fw-semibold">{product.name}</h6>
                                <div className="mb-2 text-warning">
                                    {"★".repeat(Math.floor(Number(product.rating)))}
                                    {"☆".repeat(5 - Math.floor(Number(product.rating)))}
                                    <small className="text-muted ms-1">{product.rating}/5</small>
                                </div>
                                <div>
                                    <span className="fw-bold me-2">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-muted text-decoration-line-through me-2">
                                            {product.oldPrice}
                                        </span>
                                    )}
                                    {product.discount && (
                                        <span className={styles.discount}>{`-${product.discount}`}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;