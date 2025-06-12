"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
    cards: any[];
    numberOfProducts?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    cards,
    numberOfProducts = 10,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(cards.length / numberOfProducts);
    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

    const handleNextPage = () => {
        if (currentPage < pages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full flex justify-center items-center gap-4">
            <button
                onClick={handlePrevPage}
                className="border border-gray-200 px-3 py-2 text-black rounded-md cursor-pointer font-medium hover:bg-black hover:text-white"
            >
                <FaArrowLeft />
            </button>

            <ul className="flex gap-1">
                {pagesArray
                    .slice(
                        currentPage > 3 && pages > 6 ? currentPage - 3 : 0,
                        pages > 6 ? currentPage + 2 : pages
                    )
                    .map((page) => (
                        <li
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-md 
                ${currentPage === page
                                    ? "bg-black text-white"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </li>
                    ))}
            </ul>

            <button
                onClick={handleNextPage}
                className="border border-gray-200 px-3 py-2 text-black font-medium cursor-pointer rounded-md hover:bg-black hover:text-white"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
