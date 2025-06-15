import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Review } from "@/types/review.types";

type ReviewCardProps = {
    blurChild?: React.ReactNode;
    isAction?: boolean;
    isDate?: boolean;
    data: Review;
    className?: string;
};

// ⭐️ Thay thế Rating component bằng icon đơn giản
const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        );
    }
    return stars;
};

const ReviewCard = ({
    blurChild,
    isAction = false,
    isDate = false,
    data,
    className = "",
}: ReviewCardProps) => {
    return (
        <div
            className={`relative bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden ${className}`}
        >
            {blurChild && blurChild}

            {/* Rating + Action */}
            <div className="w-full flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-lg">{renderStars(data.rating)}</div>
                {isAction && (
                    <button className="p-1 rounded hover:bg-gray-100 transition">
                        <IoEllipsisHorizontal className="text-black/40 text-2xl" />
                    </button>
                )}
            </div>

            {/* User */}
            <div className="flex items-center mb-2 sm:mb-3">
                <strong className="text-black sm:text-xl mr-1">{data.user}</strong>
                <IoIosCheckmarkCircle className="text-[#01AB31] text-xl sm:text-2xl" />
            </div>

            {/* Content */}
            <p className="text-sm sm:text-base text-black/60">{data.content}</p>

            {/* Date */}
            {isDate && (
                <p className="text-black/60 text-sm font-medium mt-4 sm:mt-6">
                    Posted on {data.date}
                </p>
            )}
        </div>
    );
};

export default ReviewCard;
