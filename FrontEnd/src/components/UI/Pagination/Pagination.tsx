<<<<<<< Updated upstream
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
    cards: any[]; // Bạn có thể thay `any[]` bằng kiểu cụ thể, ví dụ: `Product[]`
    numberOfProducts?: number;
}

const Pagination: React.FC<PaginationProps> = ({ cards, numberOfProducts = 10 }) => {
    const [currentPage, setCurrentPage] = useState<number>(3);

    const pages = Math.ceil(1000 / numberOfProducts);
    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

    const end = pages > 6 ? 3 : pages;

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
                {pagesArray.slice(0, end).map((page) => (
                    <li
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-md 
              ${currentPage === page
                                ? "bg-black text-white"
                                : "text-gray-500 hover:bg-gray-100"
                            }`}
                        key={page}
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
=======
import * as React from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

const Pagination = ({ className = "", ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={`mx-auto flex w-full justify-center ${className}`}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className = "", ...props }, ref) => (
    <ul ref={ref} className={`flex flex-row items-center gap-1 ${className}`} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className = "", ...props }, ref) => (
    <li ref={ref} className={className} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// Tự viết style cho button pagination
function getPaginationButtonClass(isActive?: boolean, size?: string, className = "") {
    const base =
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const sizeClass =
        size === "default"
            ? "h-9 px-4 py-2"
            : size === "icon"
                ? "h-9 w-9"
                : "";
    const variantClass = isActive
        ? "bg-black/5 text-black"
        : "bg-transparent hover:bg-gray-100 text-gray-700";

    return `${base} ${sizeClass} ${variantClass} ${className}`;
}

type PaginationLinkProps = {
    isActive?: boolean;
    size?: "default" | "icon";
} & React.ComponentProps<"a">;

const PaginationLink = ({
    className = "",
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={getPaginationButtonClass(isActive, size, className)}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className = "",
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={`gap-1 px-2.5 xs:pl-2.5 ${className}`}
        {...props}
    >
        <ArrowLeftIcon className="h-4 w-4 hidden xs:block" />
        <span className="xs:ml-2">Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className = "",
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={`gap-1 px-2.5 xs:pr-2.5 ${className}`}
        {...props}
    >
        <span className="xs:mr-2">Next</span>
        <ArrowRightIcon className="h-4 w-4 hidden xs:block" />
    </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
    className = "",
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center ${className}`}
        {...props}
    >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
>>>>>>> Stashed changes
