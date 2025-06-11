import React from "react";
import Image from "next/image";
import star from "../../assets/StarRate.svg";
import halfstar from "../../assets/halfstar.svg";

interface StarsRatingProps {
    rating: number;
    showRating?: boolean;
}

const StarsRating: React.FC<StarsRatingProps> = ({ rating, showRating = false }) => {
    const stars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center">
            {Array.from({ length: stars }).map((_, index) => (
                <Image src={star} alt="star" key={index} className="w-4 h-4" />
            ))}
            {halfStar && (
                <Image src={halfstar} alt="halfstar" className="w-4 h-4 -ml-1" />
            )}
            {showRating && (
                <span className="text-gray-500 text-sm ml-2 font-light">{rating}/5</span>
            )}
        </div>
    );
};

export default StarsRating;
