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
    const productsPerPage = 6;

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
            <SidebarFilter
                setshowSideBar={setshowSideBar}
                showSideBar={showSideBar}
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>T-shirts</h1>
                    <button
                        onClick={() => setshowSideBar(true)}
                        className={styles.filterButton}
                    >
                        <FaSlidersH /> filter
                    </button>
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

                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="btn btn-sm me-2"
                        disabled={currentPage === 1}
                    >
                        <Image src="/images/arrow-left.svg" alt="Previous" width={20} height={20} className="me-1" />
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                            // Show first, last, current, +/- 1 pages
                            return (
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 1
                            );
                        })
                        .reduce((acc: (number | "...")[], page, idx, arr) => {
                            // Add "..." between non-adjacent numbers
                            if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                                acc.push("...");
                            }
                            acc.push(page);
                            return acc;
                        }, [])
                        .map((item, index) =>
                            item === "..." ? (
                                <span key={index} className="mx-1 text-muted">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={item}
                                    className={`btn btn-sm me-2 ${currentPage === item ? "btn-dark" : "btn-outline-secondary"
                                        }`}
                                    onClick={() => handlePageChange(item as number)}
                                >
                                    {item}
                                </button>
                            )
                        )}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="btn btn-sm"
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <Image src="/images/arrow-right.svg" alt="Next" width={20} height={20} className="ms-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
