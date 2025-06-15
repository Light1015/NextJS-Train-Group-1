"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import SidebarFilter from "@components/Layouts/SidebarFilter/SidebarFilter";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import Pagination from "@/components/UI/Pagination/Pagination";
import products from "@/constants/products";

export default function Casual() {
    const [showSideBar, setshowSideBar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setProductsPerPage(6); // mobile
            } else {
                setProductsPerPage(9); // desktop
            }
        };

        handleResize(); // on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Main Container */}
            <div className="container relative mx-auto py-4 px-6 md:px-5 flex gap-10">
                {/* Sidebar - desktop */}
                <div className="hidden md:block w-64">
                    <SidebarFilter
                        setshowSideBar={setshowSideBar}
                        showSideBar={showSideBar}
                    />
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Header Section */}
                    <div className="w-full mb-6">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            {/* Left side: Title */}
                            <h1
                                className="text-lg md:text-2xl font-bold mt-0"
                                style={{
                                    fontFamily: "Satoshi",
                                    fontWeight: 700,
                                    lineHeight: "100%",
                                    letterSpacing: "0",
                                    verticalAlign: "middle",
                                }}
                            >
                                Casual
                            </h1>

                            {/* Right side: Count + Sort + Filter button */}
                            <div className="flex items-center gap-3">
                                {/* Product count */}
                                <div
                                    className="text-xs md:text-base text-gray-700 text-right"
                                    style={{
                                        fontFamily: "Satoshi",
                                        fontWeight: 400,
                                        lineHeight: "100%",
                                        letterSpacing: "0",
                                    }}
                                >
                                    Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, products.length)} of {products.length} Products
                                </div>

                                {/* Sort by - desktop only */}
                                <div
                                    className="hidden md:flex items-center gap-1 text-sm text-gray-700"
                                    style={{ fontFamily: "Satoshi", fontSize: "16px", lineHeight: "100%" }}
                                >
                                    <span>
                                        Sort by:&nbsp;
                                        <span style={{ fontWeight: 500 }}>Most Popular</span>
                                    </span>
                                    <BsChevronDown className="text-gray-500" />
                                </div>

                                {/* Filter button - mobile only */}
                                <button
                                    onClick={() => setshowSideBar(true)}
                                    className="flex md:hidden items-center gap-1 bg-gray-100 cursor-pointer hover:bg-black hover:text-white text-gray-400 rounded-full py-2 px-2"
                                >
                                    <Image
                                        src="/images/filter.webp"
                                        alt="filter icon"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="w-full mt-10 py-5 border-t border-gray-200">
                        <Pagination
                            cards={products}
                            numberOfProducts={productsPerPage}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div >

            {/* Mobile Sidebar Filter */}
            {
                showSideBar && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center md:hidden">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-40"
                            onClick={() => setshowSideBar(false)}
                        />
                        <div className="absolute left-1/2 -translate-x-1/2 w-[390px] h-[1066px] rounded-t-[20px] bg-[#00000033] z-50 overflow-y-auto filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                            <SidebarFilter
                                showSideBar={showSideBar}
                                setshowSideBar={setshowSideBar}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}
