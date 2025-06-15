"use client";

import React from "react";
import Image from "next/image";

interface PaginationProps {
  cards: any[];
  numberOfProducts?: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  cards,
  numberOfProducts = 9,
  currentPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(cards.length / numberOfProducts);

  return (
    <div className="w-full mt-1 pt-5 flex justify-center ">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 w-full max-w-full md:max-w-4xl px-4">
        {/* Left Button */}
        <div className="flex justify-start md:flex-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-[110px] h-9 rounded-md text-sm flex items-center justify-center border border-black/10 bg-white gap-1 hover:bg-black/5 disabled:opacity-50"
          >
            <Image src="/images/arrow-left.png" alt="Previous" width={20} height={20} />
            Previous
          </button>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
            )
            .reduce<(number | "...")[]>((acc, page, idx, arr) => {
              if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(page);
              return acc;
            }, [])
            .map((item, index) =>
              item === "..." ? (
                <span key={`dots-${index}`} className="text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${item}`}
                  onClick={() => handlePageChange(item as number)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-md text-sm flex items-center justify-center ${
                    currentPage === item
                      ? "bg-black/5 text-black"
                      : "border border-gray-300 bg-white text-black"
                  }`}
                >
                  {item}
                </button>
              )
            )}
        </div>

        {/* Right Button */}
        <div className="flex justify-end md:flex-1">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-[86px] h-9 rounded-md text-sm flex items-center justify-center border border-black/10 bg-white gap-1 hover:bg-black/5 disabled:opacity-50"
          >
            Next
            <Image src="/images/arrow-right.png" alt="Next" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
