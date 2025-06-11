import React from "react";
import StarsRating from "./StarsRating";
import { FaCheckCircle } from "react-icons/fa";

interface Testimonial {
    name: string;
    review: string;
}

interface ReviewCardProps {
    testimonial: Testimonial;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
    return (
        <div className="relative bg-white rounded-lg p-4 border border-gray-200 min-w-[300px]">
            <div className="flex items-center mb-2">
                <StarsRating rating={5} />
            </div>
            <h3 className="font-semibold flex items-center gap-1">
                {testimonial.name} <FaCheckCircle size={14} color="#00be00" />
            </h3>
            <p className="text-gray-600 line-clamp-4 mt-2">{testimonial.review}</p>
        </div>
    );
};

export default ReviewCard;
