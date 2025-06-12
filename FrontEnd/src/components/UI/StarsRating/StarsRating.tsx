"use client";
import React from "react";

interface StarsRatingProps {
    rating: number;
    showRating?: boolean;
}

function StarsRating({ rating, showRating }: StarsRatingProps) {
    const stars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center">
            {Array.from({ length: stars }).map((_, index) => (
                <img src="/images/StarRate.svg" alt="star" key={index} className="w-4 h-4" />
            ))}
            {halfStar && (
                <img src="/images/halfstar.svg" alt="halfstar" className="w-4 h-4 -ml-1" />
            )}
            {showRating && (
                <span className="text-gray-500 text-sm ml-2 font-light">{rating}/5</span>
            )}
        </div>
    );
}

export default StarsRating;
