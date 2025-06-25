"use client";

import React from "react";
import ProductListSec from "@/components/UI/ProductListSec/ProductListSec";
import Brands from "@/app/(main)/homepage/Brands";
import DressStyle from "@/app/(main)/homepage/DressStyle";
import HeaderHome from "@/app/(main)/homepage/Header";
import Reviews from "@/app/(main)/homepage/Review";
import { Review } from "@/types/review.types";
import reviews from '@/constants/reviews';
import products from "@/constants/products";

// Tạo danh sách sản phẩm theo định dạng ProductListSec cần
const newArrivalsData = products.slice(0, 4).map((p) => {
  const priceNumber = typeof p.price === "string" ? parseFloat(p.price.replace("$", "")) : p.price;

  return {
    id: p.id,
    title: p.name,
    srcUrl: p.image,
    gallery: [p.image],
    price: priceNumber,
    discount: {
      amount: 0,
      percentage: p.discount ? parseInt(p.discount.replace("%", "")) : 0,
    },
    rating: p.rating,
  };
});

const topSellingData = products.slice(4, 8).map((p) => ({
  id: p.id,
  title: p.name,
  srcUrl: p.image,
  gallery: [p.image],
  price: typeof p.price === "string" ? parseFloat(p.price.replace("$", "")) : p.price,
  discount: {
    amount: 0,
    percentage: p.discount ? parseInt(p.discount.replace("%", "")) : 0,
  },
  rating: p.rating,
}));


// export const reviewsData: Review[] = [
//   {
//     id: 1,
//     user: "Alex K.",
//     content:
//       '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
//     rating: 5,
//     date: "August 14, 2023",
//   },
//   {
//     id: 2,
//     user: "Sarah M.",
//     content: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
//     rating: 5,
//     date: "August 15, 2023",
//   },
//   {
//     id: 3,
//     user: "Ethan R.",
//     content: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
//     rating: 5,
//     date: "August 16, 2023",
//   },
//   {
//     id: 4,
//     user: "Olivia P.",
//     content: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
//     rating: 5,
//     date: "August 17, 2023",
//   },
//   {
//     id: 5,
//     user: "Liam K.",
//     content: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
//     rating: 5,
//     date: "August 18, 2023",
//   },
//   {
//     id: 6,
//     user: "Samantha D.",
//     content: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
//     rating: 5,
//     date: "August 19, 2023",
//   },
// ];

export default function Home() {
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