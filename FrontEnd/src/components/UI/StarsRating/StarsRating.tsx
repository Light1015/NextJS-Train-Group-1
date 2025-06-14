'use client';

import React from 'react';
import Image from 'next/image';

interface StarsRatingProps {
    rating: number;
    showRating?: boolean;
}

function StarsRating({ rating, showRating = false }: StarsRatingProps) {
    const stars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: stars }).map((_, index) => (
                <Image
                    key={index}
                    src="/images/StarRate.webp"
                    alt="star"
                    width={16}
                    height={16}
                />
            ))}
            {halfStar && (
                <Image
                    src="/images/halfstar.webp"
                    alt="half star"
                    width={9}
                    height={9}
                    className="-ml-1"
                />
            )}
            {showRating && (
                <span className="text-gray-500 text-sm ml-2 font-light">
                    {rating}/5
                </span>
            )}
        </div>
    );
}

export default StarsRating;
