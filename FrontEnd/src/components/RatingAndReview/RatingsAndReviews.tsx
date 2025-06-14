'use client';

import { useState } from 'react';
import styles from './RatingsAndReviews.module.scss';
import Image from 'next/image';
import reviews from '@/constants/reviews';
import StarsRating from '../UI/StarsRating/StarsRating';

const RatingsAndReviews = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <>
            <div className={`${styles.headerRow} flex flex-col md:flex-row justify-between items-center mb-4`}>
                <h4 className="mb-2 md:mb-0">
                    All Reviews <span className={styles.reviewCount}>({reviews.length})</span>
                </h4>
                <div className="flex items-center gap-2">
                    <button className={styles.iconButton}>
                        <Image src="/images/Filter.png" alt="Filter" width={24} height={24} />
                    </button>

                    <button className={styles.dropdownButton}>
                        Latest
                        <Image
                            src="/images/dropdown.webp"
                            alt="Dropdown arrow"
                            width={12}
                            height={12}
                            className={styles.arrowIcon}
                        />
                    </button>

                    <button className={styles.writeButton}>
                        Write a Review
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {reviews.slice(0, visibleCount).map((review) => (
                    <div key={review.id} className="w-full h-full">
                        <div className={`${styles.cardReview} h-full relative bg-white p-4 rounded-md shadow`}>
                            <Image
                                src="/images/3Dot.png"
                                alt="More options"
                                className={`${styles.moreIcon} absolute top-4 right-4`}
                                width={20}
                                height={20}
                            />

                            <div className={`${styles.starRow} mb-2`}>
                                <StarsRating rating={Number(review.rating)} showRating={true} />
                            </div>

                            <div className={`${styles.nameRow} flex items-center gap-2 mb-2`}>
                                <h6 className="mb-0 font-semibold">{review.name}</h6>
                                <Image
                                    src="/images/tickgreen.png"
                                    alt="Verified"
                                    width={16}
                                    height={16}
                                    className={styles.verifiedIcon}
                                />
                            </div>

                            <p className={`${styles.reviewText} italic text-gray-600 mb-2`}>
                                "{review.review}"
                            </p>

                            <small className={`${styles.postedDate} text-sm text-gray-400`}>{review.posted}</small>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < reviews.length && (
                <div className="text-center mt-6">
                    <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                        Load More Reviews
                    </button>
                </div>
            )}
        </>
    );
};

export default RatingsAndReviews;
