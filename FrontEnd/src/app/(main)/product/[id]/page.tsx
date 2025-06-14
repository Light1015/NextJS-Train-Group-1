'use client';

import React, { useState } from 'react';
import styles from './ProductDetail.module.scss';
import Button from "@/components/UI/Button/Button";
import products from "@/constants/products";
import ProductDetail from '@/components/ProductDetail/ProductDetails';
import RatingsAndReviews from '@/components/RatingAndReview/RatingsAndReviews';
import FAQs from '@/components/Faqs/FAQs';
import Product from "@/components/Product/Product";
import { useParams } from 'next/navigation';

const ProductDetails = () => {

    const params = useParams();
    const productId = parseInt(params.id as string, 10);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type: 'inc' | 'dec') => {
        setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    const renderStars = () => {
        const ratingNumber = product.rating; // rating is already a number
        const stars = [];
        const fullStars = Math.floor(ratingNumber);
        const hasHalfStar = ratingNumber % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<img key={i} src="/images/StarRate.svg" alt="star" className={styles.star} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<img key={i} src="/images/halfstar.svg" alt="half star" className={styles.star} />);
            }
        }
        return stars;
    };

    const [activeTab, setActiveTab] = useState<'detail' | 'review' | 'faq'>('detail');

    const renderContent = () => {
        switch (activeTab) {
            case 'detail':
                return <ProductDetail />;
            case 'review':
                return <RatingsAndReviews />
            case 'faq':
                return <FAQs />;
            default:
                return null;
        }
    };
    return (
        <>
            <div className={styles.productDetail}>
                <div className={styles.left}>
                    <div className={styles.thumbnailList}>
                        <img src="/images/products/One-Life-Graphic-T-shirt.svg" alt="thumb1" />
                        <img src="/images/products/One-Life-Graphic-T-shirt-front.svg" alt="thumb2" />
                        <img src="/images/products/People-One-Life-Graphic-T-shirt.svg" alt="thumb3" />
                    </div>
                    <div className={styles.mainImage}>
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                <div className={styles.right}>
                    <h2>{product.name}</h2>
                    <div className={styles.rating}>
                        {renderStars()}
                        <span>{product.rating}/5</span>
                    </div>

                    <div className={styles.price}>
                        <span className={styles.current}>{product.price}</span>
                        {product.oldPrice !== undefined && product.oldPrice !== null && (
                            <span className={styles.old}>${product.oldPrice}</span>
                        )}

                        {product.discount !== undefined && product.discount !== null && (
                            <span className={styles.discount}>-{product.discount}%</span>
                        )}
                    </div>

                    <p className={styles.description}>
                        This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                    </p>

                    <div className={styles.section}>
                        <h4>Selected Colors</h4>
                        <div className={styles.colors}>
                            <button
                                className={selectedColor === 'color1' ? styles.active : ''}
                                onClick={() => setSelectedColor('color1')}
                                style={{ background: '#4F4631' }}
                            >
                                {selectedColor === 'color1' && (
                                    <img src="/images/tick.png" alt="Selected" className={styles.tick} />
                                )}
                            </button>
                            <button
                                className={selectedColor === 'color2' ? styles.active : ''}
                                onClick={() => setSelectedColor('color2')}
                                style={{ background: '#314F4A' }}
                            >
                                {selectedColor === 'color2' && (
                                    <img src="/images/tick.png" alt="Selected" className={styles.tick} />
                                )}
                            </button>
                            <button
                                className={selectedColor === 'color3' ? styles.active : ''}
                                onClick={() => setSelectedColor('color3')}
                                style={{ background: '#31344F' }}
                            >
                                {selectedColor === 'color3' && (
                                    <img src="/images/tick.png" alt="Selected" className={styles.tick} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>Choose Size</h4>
                        <div className={styles.sizes}>
                            {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                                <button
                                    key={size}
                                    className={selectedSize === size ? styles.active : ''}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.quantity}>
                            <button onClick={() => handleQuantity('dec')}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantity('inc')}>+</button>
                        </div>
                        {/* <Button className={styles.cartButton}>Add to Cart</Button> */}
                         <Button
                            title="Add to Cart"
                            classes="bg-black text-white w-full md:w-fit"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.tabWrapper}>
                <button
                    className={activeTab === 'detail' ? styles.activeTab : styles.inactiveTab}
                    onClick={() => setActiveTab('detail')}
                >
                    Product Details
                </button>
                <button
                    className={activeTab === 'review' ? styles.activeTab : styles.inactiveTab}
                    onClick={() => setActiveTab('review')}
                >
                    Ratings & Reviews
                </button>
                <button
                    className={activeTab === 'faq' ? styles.activeTab : styles.inactiveTab}
                    onClick={() => setActiveTab('faq')}
                >
                    FAQs
                </button>
            </div>
            <div className={styles.tabContent}>{renderContent()}</div>

            <Product />
        </>
    );
};
export default ProductDetails;