"use client";

import React from "react";
import ReviewCard from "@/components/UI/ReviewCard/ReviewCard";
import { Review } from "@/types/review.types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import * as motion from "framer-motion/client";

type ReviewsProps = { data: Review[] };

const Reviews = ({ data }: ReviewsProps) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    // Detect mobile screen size
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Tạo data với vòng lặp vô hạn (duplicate data)
    const infiniteData = React.useMemo(() => {
        if (data.length === 0) return [];
        // Nhân đôi data để tạo hiệu ứng vô hạn
        return [...data, ...data, ...data];
    }, [data]);

    // Track scroll position with better precision
    const handleScroll = () => {
        if (scrollRef.current && !scrollRef.current.dataset.scrolling) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const cardWidth = isMobile ? 320 + 24 : 400 + 24; // mobile width + gap
            const newIndex = Math.round(scrollLeft / cardWidth);
            setCurrentIndex(newIndex % data.length);

            // Reset position for infinite scroll - cải thiện logic vô tận
            const totalWidth = cardWidth * data.length;

            // Khi cuộn quá xa về phải
            if (scrollLeft >= totalWidth * 2) {
                scrollRef.current.dataset.scrolling = 'true';
                scrollRef.current.scrollLeft = scrollLeft - totalWidth;
                setTimeout(() => {
                    if (scrollRef.current) {
                        delete scrollRef.current.dataset.scrolling;
                    }
                }, 100);
            }

            // Khi cuộn quá xa về trái
            if (scrollLeft <= 0) {
                scrollRef.current.dataset.scrolling = 'true';
                scrollRef.current.scrollLeft = scrollLeft + totalWidth;
                setTimeout(() => {
                    if (scrollRef.current) {
                        delete scrollRef.current.dataset.scrolling;
                    }
                }, 100);
            }
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const cardWidth = isMobile ? 320 + 24 : 400 + 24;
            const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // Setup event listeners
    React.useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);

            // Initialize position để căn giữa 3 cards (chỉ trên desktop)
            setTimeout(() => {
                if (scrollElement && !isMobile) {
                    const containerWidth = scrollElement.clientWidth;
                    const cardWidth = 400 + 24;

                    // Tính toán vị trí để có 3 cards ở giữa
                    const startPosition = (400 + 24) * data.length - (containerWidth / 2) + (cardWidth * 1.5);
                    scrollElement.scrollLeft = startPosition;
                }
            }, 100);

            return () => {
                scrollElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [data.length, isMobile]);

    // Tính toán opacity cho từng card (chỉ áp dụng trên desktop)
    const getCardOpacity = (index: number) => {
        // Trên mobile, tất cả cards đều có opacity = 1 (không có hiệu ứng làm mờ)
        if (isMobile) return 1;

        if (!scrollRef.current) return 1;

        const scrollLeft = scrollRef.current.scrollLeft;
        const containerWidth = scrollRef.current.clientWidth;
        const cardWidth = 400 + 24;

        // Vị trí của card
        const cardLeft = index * cardWidth;
        const cardCenter = cardLeft + 200;

        // Tính viewport center
        const viewportCenter = scrollLeft + containerWidth / 2;

        // Khoảng cách từ card center đến viewport center
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

        // Zone cho 3 cards ở giữa (rộng hơn để 3 cards rõ ràng)  
        const centerZone = cardWidth * 1.8;

        if (distanceFromCenter <= centerZone) {
            return 1;
        }

        // Fade zone nhỏ hơn để transition mượt
        const fadeZone = cardWidth * 0.5;
        const fadeDistance = distanceFromCenter - centerZone;

        if (fadeDistance <= fadeZone) {
            // Giảm độ mờ từ 0.3 xuống 0.5 (ít mờ hơn)
            return Math.max(0.5, 1 - (fadeDistance / fadeZone) * 0.5);
        }

        return 0.5; // Giảm độ mờ tối thiểu từ 0.3 xuống 0.5
    };

    return (
        <section className="overflow-hidden py-16 bg-white relative w-full">
            <div className="relative z-10 w-full px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
                    <div>
                        <motion.h2
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black"
                            style={{ fontFamily: 'Integral CF', fontWeight: 700 }}
                        >
                            OUR HAPPY CUSTOMERS
                        </motion.h2>
                    </div>

                    {/* Arrow buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => scroll("left")}
                            className="group p-3 rounded-full bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <FaArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="group p-3 rounded-full bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <FaArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Scrollable container */}
                <motion.div
                    initial={{ y: "100px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative w-full"
                >
                    {/* Left fade overlay - Chỉ hiển thị trên desktop */}
                    {!isMobile && (
                        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none"></div>
                    )}

                    {/* Right fade overlay - Chỉ hiển thị trên desktop */}
                    {!isMobile && (
                        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none"></div>
                    )}

                    <div
                        ref={scrollRef}
                        className="flex space-x-6 overflow-x-auto pb-6 scroll-smooth hide-scrollbar"
                        onScroll={handleScroll}
                        style={{
                            scrollSnapType: 'x mandatory',
                            // Trên mobile: padding bình thường, trên desktop: căn giữa 3 cards
                            paddingLeft: isMobile ? '16px' : 'calc(50vw - 636px)',
                            paddingRight: isMobile ? '16px' : 'calc(50vw - 636px)'
                        }}
                    >
                        {infiniteData.map((review, index) => (
                            <div
                                key={`${review.id}-${Math.floor(index / data.length)}`}
                                className="flex-shrink-0 review-card-container"
                                style={{
                                    opacity: getCardOpacity(index),
                                    transition: isMobile ? 'none' : 'opacity 0.3s ease-out',
                                    scrollSnapAlign: 'center'
                                }}
                            >
                                <div className="review-card">
                                    {/* Stars */}
                                    <div className="flex space-x-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 fill-yellow-400"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                        {[...Array(5 - review.rating)].map((_, i) => (
                                            <svg
                                                key={`empty-${i}`}
                                                className="w-5 h-5 fill-gray-200"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Name */}
                                    <div className="flex items-center mb-3">
                                        <h4 className="font-bold text-black text-lg">
                                            {review.user}
                                        </h4>
                                        <div className="ml-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Review text */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {review.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .hide-scrollbar {
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .review-card-container {
                    width: 400px;
                    height: 239.58px;
                }
                
                .review-card {
                    width: 100%;
                    height: 100%;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 20px;
                    padding: 28px 32px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                }
                
                .review-card:hover {
                    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .review-card-container {
                        width: 320px;
                        height: auto;
                        min-height: 200px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Reviews;