  "use client";

  import React, { useState } from "react";
  import styles from "./productdetail.module.scss";
  import Button from "@/components/UI/Button/Button";
  import useProductDetail from "@/hooks/useProductDetail";
  import ProductDetail from "@/components/ProductDetail/ProductDetails";
  import RatingsAndReviews from "@/components/RatingAndReview/RatingsAndReviews";
  import FAQs from "@/components/Faqs/FAQs";
  import Product from "@/components/Product/Product";
  import { useParams } from "next/navigation";
  import { useCart } from "@/context/CartContext";
  import ColorsList from "@/components/UI/ColorsList/ColorsList";
  import SizeButton from "@/components/UI/SizeButton/SizeButton";
  import Swal from "sweetalert2";

  const ProductDetails = () => {
    const params = useParams();
    const productId = parseInt(params.id as string, 10);
    const { product, loading, error: productError } = useProductDetail(productId);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("Large");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'detail' | 'review' | 'faq'>("detail");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { addToCart } = useCart();

    if (loading) return <div>Loading...</div>;
    if (productError) return <div>{productError}</div>;
    if (!product) return <div>Product not found</div>;

    const handleQuantity = (type: "inc" | "dec") => {
      setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
    };

    const renderStars = () => {
      const stars = [];
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 !== 0;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(<img key={i} src="/images/StarRate.png" alt="star" className={styles.star} />);
        } else if (i === fullStars && hasHalfStar) {
          stars.push(<img key={i} src="/images/halfstar.png" alt="half star" className={styles.star} />);
        }
      }
      return stars;
    };

    const renderContent = () => {
      switch (activeTab) {
        case "detail":
          return <ProductDetail />;
        case "review":
          return <RatingsAndReviews />;
        case "faq":
          return <FAQs />;
        default:
          return null;
      }
    };

    const handleAddToCart = () => {
      if (!selectedColor) {
        Swal.fire({
          icon: "warning",
          title: "Please select a color!",
          showConfirmButton: false,
          timer: 1200,
        });
        return;
      }

      addToCart({
        id: product.id,
        name: product.name,
        size: selectedSize,
        color: selectedColor,
        price: Number(product.price),
        quantity,
        image: product.image,
      });

      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        showConfirmButton: false,
        timer: 1500,
      });
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
    <span className={styles.current}>${product.price}</span>

    {product.old_price && (
      <span className={styles.old}>${product.old_price}</span>
    )}

    {product.discount && (
      <span className={styles.discount}>-{product.discount}%</span>
    )}
  </div>

            <p className={styles.description}>
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            <div className={styles.section}>
              <h4>Selected Colors</h4>
              <ColorsList
    colors={product.colors.map((c) => c.name)} 
    selectedColor={selectedColor}
    setSelectedColor={setSelectedColor}
  />
            </div>

            <div className={styles.section}>
              <h4>Choose Size</h4>
            <SizeButton
    sizes={product.sizes.map((s) => s.name)}
    selectedSize={selectedSize}
    setSelectedSize={setSelectedSize}
  />
            </div>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={() => handleQuantity("dec")}>−</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantity("inc")}>+</button>
              </div>
              <Button
                title="Add to Cart"
                classes="bg-black text-white w-full md:w-fit"
                handleClick={handleAddToCart}
              />
            </div>
          </div>
        </div>

        <div className={styles.tabWrapper}>
          <button
            className={activeTab === "detail" ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveTab("detail")}
          >
            Product Details
          </button>
          <button
            className={activeTab === "review" ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveTab("review")}
          >
            Ratings & Reviews
          </button>
          <button
            className={activeTab === "faq" ? styles.activeTab : styles.inactiveTab}
            onClick={() => setActiveTab("faq")}
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
