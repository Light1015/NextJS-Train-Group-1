"use client";

import React from "react";
import ProductListSec from "@/components/UI/ProductListSec/ProductListSec";
import Brands from "@/app/(main)/homepage/Brands";
import DressStyle from "@/app/(main)/homepage/DressStyle";
import HeaderHome from "@/app/(main)/homepage/Header";
import Reviews from "@/app/(main)/homepage/Review";
import reviews from "@/constants/reviews";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { products, loading } = useProducts();

  if (loading || !Array.isArray(products)) {
    return <p className="text-center mt-10">Đang tải sản phẩm...</p>;
  }

  const formatProduct = (p: any) => {
    const discountStr = p.discount || "";
    const percentage = discountStr.includes("%")
      ? parseInt(discountStr.replace("%", ""))
      : 0;

    const image = p.image || "";

    return {
      id: p.id,
      name: p.name,
      image: image,
      color: p.color ?? "",
      size: p.size ?? "",
      title: p.name,
      srcUrl: image,
      gallery: [image],
      price: parseFloat(p.price),
      oldPrice: p.old_price ? parseFloat(p.old_price) : undefined,
      discount: percentage > 0 ? `${percentage}%` : undefined,
      rating: parseFloat(p.rating),
      colors: Array.isArray(p.colors) ? p.colors : [],
      sizes: Array.isArray(p.sizes) ? p.sizes : [],
    };
  };

  const newArrivalsData = products.slice(0, 4).map(formatProduct);
  const topSellingData = products.slice(4, 8).map(formatProduct);

  return (
    <div>
      <HeaderHome />
      <Brands />
      <section className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/casual"
        />

        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>

        <ProductListSec
          title="TOP SELLING"
          data={topSellingData}
          viewAllLink="/casual"
        />

        <div className="my-[50px] sm:my-20">
          <DressStyle />
        </div>

        <Reviews
          data={reviews.map((r) => ({
            id: r.id,
            user: r.name ?? "",
            content: r.review ?? "",
            date: r.posted ?? "",
            rating:
              typeof r.rating === "number" ? r.rating : parseInt(r.rating, 10),
          }))}
        />
      </section>
    </div>
  );
}
