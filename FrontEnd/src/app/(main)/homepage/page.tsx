"use client";

import React from "react";
import ProductListSec from "@/components/UI/ProductListSec/ProductListSec";
import Brands from "@/app/(main)/homepage/Brands";
import DressStyle from "@/app/(main)/homepage/DressStyle";
import HeaderHome from "@/app/(main)/homepage/Header";
import Reviews from "@/app/(main)/homepage/Review";
import { Review } from "@/types/review.types";
import reviews from '@/constants/reviews';
// import products from "@/constants/products";
import { useProducts } from "@/hooks/useProducts";
export default function Home() {

   const { products, loading } = useProducts();
   if (loading) {
    return <p className="text-center mt-10">Đang tải sản phẩm...</p>;
  }
  const newArrivalsData = products.slice(0, 4).map((p) => ({
      id: p.id,
      title: p.name,
      srcUrl: p.image ?? "",
      gallery: [p.image ?? ""],
      price: parseFloat(p.price),
      discount: {
        amount: 0,
        percentage: p.discount ? parseInt((p.discount ?? "").replace("%", "")) : 0,
      },
      rating: p.rating,
    }));

  const topSellingData = products.slice(4, 8).map((p) => ({
      id: p.id,
      title: p.name,
      srcUrl: p.image ?? "",
      gallery: [p.image ?? ""],
      price: parseFloat(p.price),
      discount: {
        amount: 0,
        percentage: p.discount ? parseInt((p.discount ?? "").replace("%", "")) : 0,
      },
      rating: p.rating,
    }));
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

        <Reviews data={reviews.map((r) => ({
          id: r.id,
          user: r.name ?? "",
          content: r.review ?? "",
          date: r.posted ?? "",
          rating: typeof r.rating === "number" ? r.rating : parseInt(r.rating, 10),
        }))} />
      </section>
    </div>
  );
}