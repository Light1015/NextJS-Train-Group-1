// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main>
//       <h1>Home Page</h1>
//       <nav>
//         <ul>
//           <li>
//             <Link href='/about'>About</Link>
//           </li>
//           <li>
//             <Link href='/contact'>Contact</Link>
//           </li>
//           <li>
//             <Link href='/blog'>Blog</Link>
//           </li>
//         </ul>
//       </nav>
//     </main>
//   );
// }
// "use client";

import React from "react";
import Link from "next/link";
import products from "../Constants/products";

import {
  Hero,
  Companies,
  ProductsSwiper,
  DressStyleGrid,
  Testimonials,
} from "../components/layout";

const Home: React.FC = () => {
  return (
    <main>
      <nav className="mb-8">
        <ul className="flex gap-4 text-blue-600 underline">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>

      <Hero />
      <Companies />
      <ProductsSwiper products={products.slice(0, 6)} title="New Arrivals" />
      <ProductsSwiper products={products.slice(5, 11)} title="Top Selling" />
      <DressStyleGrid />
      <Testimonials />
    </main>
  );
};

export default Home;
