'use client';

import { useState } from 'react';
import styles from './RatingsAndReviews.module.scss';
import Image from 'next/image';
import { Row, Col, Card } from 'react-bootstrap';
import reviews from '@/constants/reviews';
import 'bootstrap/dist/css/bootstrap.min.css';

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(
                <Image
                    key={i}
                    src="/images/StarRate.svg"
                    alt="Full Star"
                    width={16}
                    height={16}
                />
            );
        } else if (rating + 0.5 >= i) {
            stars.push(
                <Image
                    key={i}
                    src="/images/halfstar.svg"
                    alt="Half Star"
                    width={16}
                    height={16}
                />
            );
        }
    }
    return stars;
};

const RatingsAndReviews = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <>
            <div className={styles.headerRow}>
                <h4 className="mb-0">
                    All Reviews <span className={styles.reviewCount}>({reviews.length})</span>
                </h4>
                <div className="d-flex align-items-center gap-2">
                    {/* Nút 1: Icon Filter */}
                    <button className={styles.iconButton}>
                        <Image src="/images/Filter.png" alt="Filter" width={24} height={24} />
                    </button>

                    {/* Nút 2: Dropdown */}
                    <button className={styles.dropdownButton}>
                        Latest
                        <Image
                            src="/images/dropdown.svg" // đổi thành ảnh của bạn nếu cần
                            alt="Dropdown arrow"
                            width={12}
                            height={12}
                            className={styles.arrowIcon}
                        />
                    </button>

                    {/* Nút 3: Write a Review */}
                    <button className={styles.writeButton}>
                        Write a Review
                    </button>
                </div>
            </div>
            <Row className="g-4">
                {reviews.slice(0, visibleCount).map((review) => (
                    <Col key={review.id} xs={12} md={6}>
                        <Card className={`${styles.cardReview} h-100`}>
                            {/* 3 Dot */}
                            <Image
                                src="/images/3Dot.png"
                                alt="More options"
                                className={styles.moreIcon}
                                width={20}
                                height={20}
                            />

                            {/* Stars */}
                            <div className={styles.starRow}>
                                {renderStars(parseFloat(review.rating))}
                            </div>

                            {/* Name + tick */}
                            <div className={styles.nameRow}>
                                <h6 className="mb-0">{review.name}</h6>
                                <Image
                                    src="/images/tickgreen.png"
                                    alt="Verified"
                                    width={16}
                                    height={16}
                                    className={styles.verifiedIcon}
                                />
                            </div>

                            {/* Review */}
                            <p className={styles.reviewText}>
                                "{review.review}"
                            </p>

                            {/* Date */}
                            <small className={styles.postedDate}>{review.posted}</small>
                        </Card>
                    </Col>
                ))}
            </Row>

            {visibleCount < reviews.length && (
                <div className="text-center mt-3">
                    <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                        Load More Reviews
                    </button>

                </div>
            )}
        </>
    );
};

export default RatingsAndReviews;
