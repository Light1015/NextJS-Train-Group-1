import React from "react";
import * as motion from "framer-motion/client";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import Title from "@/components/UI/Title/Title";
import { Product } from "@/types/product.types";
import Link from "next/link";

type ProductListSecProps = {
    title: string;
    data: Product[];
    viewAllLink?: string;
};

const ProductListSec = ({ title, data, viewAllLink }: ProductListSecProps) => {
    return (
        <section className="max-w-screen-xl mx-auto px-4 text-center">
            {/* Title with Animation */}
            <motion.div
                initial={{ y: "100px", opacity: 0 }}
                whileInView={{ y: "0", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Title
                    title={title}
                    classes="mb-8 sm:mb-10 text-2xl sm:text-3xl lg:text-4xl uppercase font-bold tracking-wide"
                />
            </motion.div>

            {/* Mobile: Horizontal Scrollable Container with Animation */}
            <motion.div
                initial={{ y: "100px", opacity: 0 }}
                whileInView={{ y: "0", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="sm:hidden mb-8"
            >
                <div
                    className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                    onScroll={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.setProperty('--webkit-scrollbar', 'none');
                    }}
                >
                    {data.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex-none w-[calc(50%-8px)] min-w-[150px]"
                        >
                            <ProductCard
                                product={{
                                    id: product.id,
                                    name: product.title,
                                    image: product.srcUrl,
                                    price: `$${product.price}`,
                                    oldPrice: product.discount.percentage > 0
                                        ? `$${Math.round(product.price / (1 - product.discount.percentage / 100))}`
                                        : undefined,
                                    discount:
                                        product.discount.percentage > 0
                                            ? `${product.discount.percentage}%`
                                            : undefined,
                                    rating: product.rating,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Desktop: Grid Layout with Animation */}
            <motion.div
                initial={{ y: "100px", opacity: 0 }}
                whileInView={{ y: "0", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 sm:mb-10"
            >
                {data.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="w-full"
                    >
                        <ProductCard
                            product={{
                                id: product.id,
                                name: product.title,
                                image: product.srcUrl,
                                price: `$${product.price}`,
                                oldPrice: product.discount.percentage > 0
                                    ? `$${Math.round(product.price / (1 - product.discount.percentage / 100))}`
                                    : undefined,
                                discount:
                                    product.discount.percentage > 0
                                        ? `${product.discount.percentage}%`
                                        : undefined,
                                rating: product.rating,
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Button with Animation */}
            {viewAllLink && (
                <motion.div
                    initial={{ y: "50px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center"
                >
                    <Link
                        href={viewAllLink}
                        className="inline-block w-full max-w-xs sm:w-auto px-8 sm:px-10 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all text-sm sm:text-base font-medium"
                    >
                        View All
                    </Link>
                </motion.div>
            )}
        </section>
    );
};

export default ProductListSec;