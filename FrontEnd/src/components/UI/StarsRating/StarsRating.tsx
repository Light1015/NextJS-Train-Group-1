"use client";
import React from "react";
import styles from "./StarsRating.module.scss";

interface StarsRatingProps {
    rating: number;
    showRating?: boolean;
}

function StarsRating({ rating, showRating }: StarsRatingProps) {
    const stars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
        <div className={styles.ratingWrapper}>
            {Array.from({ length: stars }).map((_, index) => (
                <img
                    src="/images/StarRate.svg"
                    alt="star"
                    key={index}
                    className={styles.starIcon}
                />
            ))}
            {halfStar && (
                <img
                    src="/images/halfstar.svg"
                    alt="halfstar"
                    className={`${styles.starIcon} ${styles.halfStar}`}
                />
            )}
            {showRating && (
                <span className={styles.ratingNumber}>
                    {rating}
                    <span className={styles.ratingOutOf}>/5</span>
                </span>
            )}
        </div>
    );
}

export default StarsRating;
