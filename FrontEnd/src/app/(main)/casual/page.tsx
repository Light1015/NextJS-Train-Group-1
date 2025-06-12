// app/casual/page.tsx
"use client";

import React from "react";
import { SidebarFilter } from "@/components/layout";
import { ProductCard, Pagination } from "@/components/ui";
import products from "@/constants/products";
import { FaSlidersH } from "react-icons/fa";
import styles from "./Casual.module.css";

export default function Casual() {
    const [showSideBar, setshowSideBar] = React.useState(false);

    return (
        <div className={`${styles.container}`}>
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
                    {products.map((product: typeof products[number]) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className={styles.pagination}>
                    <Pagination cards={products} />
                </div>
            </div>
        </div>
    );
}
