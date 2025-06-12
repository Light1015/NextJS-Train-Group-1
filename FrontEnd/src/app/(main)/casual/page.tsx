"use client";

import React, { useState } from "react";
import SidebarFilter from "@components/Layouts/SidebarFilter/SidebarFilter";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import Image from "next/image";
import products from "@/constants/products";
import { FaSlidersH } from "react-icons/fa";
import styles from "./Casual.module.scss";

export default function Casual() {
    const [showSideBar, setshowSideBar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Tính các chỉ số phân trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebarWrapper}>
                <SidebarFilter
                    setshowSideBar={setshowSideBar}
                    showSideBar={showSideBar}
                />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Casual</h1>

                    <div className={styles.actions}>
                        <p className={styles.filterText}>Showing 1–10 of 100 Products</p>
                        <div className={styles.sort}>
                            <span>Sort by:</span>
                            <strong>Most Popular</strong>
                            <Image src="/images/dropdown.svg" alt="Sort by" width={16} height={16} />
                        </div>
                    </div>
                </div>


                <div className={styles.grid}>
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                image:
                                    typeof product.image === "string"
                                        ? product.image
                                        : product.image.src ?? "",
                                rating:
                                    typeof product.rating === "string"
                                        ? Number(product.rating)
                                        : product.rating,
                            }}
                        />
                    ))}
                </div>

                <div className={styles.paginationWrapper}>
                    <div className={styles.pagination}>
                        {/* Left */}
                        <div className={styles.left}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`btn btn-sm ${styles.navButton}`}
                                disabled={currentPage === 1}
                            >
                                <Image src="/images/arrow-left.svg" alt="Previous" width={20} height={20} />
                                Previous
                            </button>
                        </div>

                        {/* Page Numbers */}
                        <div className={styles.pageNumbers}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                                .reduce((acc: (number | "...")[], page, idx, arr) => {
                                    if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                                        acc.push("...");
                                    }
                                    acc.push(page);
                                    return acc;
                                }, [])
                                .map((item, index) =>
                                    item === "..." ? (
                                        <span key={index} className={styles.dots}>...</span>
                                    ) : (
                                        <button
                                            key={item}
                                            className={`${styles.pageButton} ${currentPage === item ? styles.active : styles.inactive}`}
                                            onClick={() => handlePageChange(item as number)}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                        </div>

                        {/* Right */}
                        <div className={styles.right}>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`btn btn-sm ${styles.navButton}`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <Image src="/images/arrow-right.svg" alt="Next" width={20} height={20} />
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
