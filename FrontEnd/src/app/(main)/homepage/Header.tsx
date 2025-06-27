"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";

const HeaderHome = () => {
    const [counter, setCounter] = useState({
        brands: 0,
        products: 0,
        customers: 0,
    });

    useEffect(() => {
        let start = Date.now();
        const duration = 2000;
        const end = { brands: 200, products: 2000, customers: 30000 };

        const step = () => {
            const now = Date.now();
            const progress = Math.min((now - start) / duration, 1);
            setCounter({
                brands: Math.floor(end.brands * progress),
                products: Math.floor(end.products * progress),
                customers: Math.floor(end.customers * progress),
            });
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, []);

    return (
        <header className="bg-[#F2F0F1] pt-32 md:pt-40 overflow-hidden h-auto md:h-[818px]">
            <div className="h-full md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {/* Left column */}
                <section className="h-full max-w-frame px-4 md:pl-[100px] md:pr-4 flex flex-col justify-center order-1">
                    <div className="mb-8 md:mb-12">
                        <motion.h1
                            initial={{ y: "100px", opacity: 0, rotate: 10 }}
                            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-5 lg:mb-8 text-[36px] md:text-[64px] leading-[36px] md:leading-[64px] font-bold tracking-normal text-left"
                            style={{ fontFamily: "Integral CF" }}
                        >
                            <span className="block md:inline">FIND CLOTHES</span>{" "}
                            <span className="block md:inline">THAT MATCHES</span>{" "}
                            <span className="block md:inline">YOUR STYLE</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-black/60 text-sm md:text-base mb-6 md:mb-8 max-w-[545px] font-normal md:font-bold text-left mx-0"
                        >
                            Browse through our diverse range of meticulously crafted garments,
                            designed to bring out your individuality and cater to your sense of style.
                        </motion.p>

                        <motion.div
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="mb-8 md:mb-12 text-left"
                        >
                            <Link
                                href="/casual"
                                className="inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-12 md:px-14 py-3 md:py-4 rounded-full hover:animate-pulse w-full md:w-auto max-w-[358px] md:max-w-none"
                            >
                                Shop Now
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats section - mobile layout */}
                    <motion.div
                        initial={{ y: "100px", opacity: 0 }}
                        whileInView={{ y: "0", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:space-y-0 md:space-x-8"
                    >
                        {/* Cột 1 */}
                        <div className="flex justify-center md:justify-start">
                            <div className="flex flex-col text-center md:text-left whitespace-nowrap">
                                <span className="font-bold text-[24px] md:text-[40px] leading-[32px] md:leading-[54px] mb-1 md:mb-2">
                                    {counter.brands}+
                                </span>
                                <span className="text-xs md:text-base text-black/60 font-normal md:font-bold">
                                    International Brands
                                </span>
                            </div>
                        </div>
                        {/* Cột 2 */}
                        {/* Cột 2 */}
                        <div className="flex justify-center md:justify-start md:pl-8 md:border-l md:border-black/10">

                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[50px] w-px bg-black/10 md:hidden"></div>
                            <div className="flex flex-col text-center md:text-left whitespace-nowrap">
                                <span className="font-bold text-[24px] md:text-[40px] leading-[32px] md:leading-[54px] mb-1 md:mb-2">
                                    {counter.products.toLocaleString()}+
                                </span>
                                <span className="text-xs md:text-base text-black/60 font-normal md:font-bold">
                                    High-Quality Products
                                </span>
                            </div>
                        </div>
                        {/* Cột 3 */}
                        {/* Cột 3 */}
                        <div className="flex justify-center md:justify-start md:pl-8 md:border-l md:border-black/10">

                            <div className="flex flex-col text-center md:text-left whitespace-nowrap">
                                <span className="font-bold text-[24px] md:text-[40px] leading-[32px] md:leading-[54px] mb-1 md:mb-2">
                                    {counter.customers.toLocaleString()}+
                                </span>
                                <span className="text-xs md:text-base text-black/60 font-normal md:font-bold">
                                    Happy Customers
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </section>

                {/* Right column - Image section */}
                <motion.section
                    initial={{ y: "100px", opacity: 0, rotate: 10 }}
                    whileInView={{ y: "0", opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.3, duration: 0.8 }}
                    className="h-[448px] md:h-full relative md:px-4 bg-cover bg-center md:bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-homepage.png')] md:bg-[url('/images/header-homepage.png')] order-2"
                >
                    <Image
                        priority
                        src="/images/big-star.svg"
                        height={104}
                        width={104}
                        alt="big star"
                        className="absolute right-4 md:right-7 xl:right-0 top-8 md:top-12 max-w-[56px] max-h-[56px] md:max-w-[76px] md:max-h-[76px] lg:max-w-24 lg:max-h-24 xl:max-w-[104px] xl:max-h-[104px] animate-[spin_4s_infinite]"
                    />
                    <Image
                        priority
                        src="/images/small-star.svg"
                        height={56}
                        width={56}
                        alt="small star"
                        className="absolute left-4 md:left-7 md:md:left-0 top-32 sm:top-64 md:top-44 lg:top-56 max-w-8 max-h-8 md:max-11 md:max-h-11 md:max-w-14 md:max-h-14 animate-[spin_3s_infinite]"
                    />
                </motion.section>
            </div>
        </header>
    );
};

export default HeaderHome;
