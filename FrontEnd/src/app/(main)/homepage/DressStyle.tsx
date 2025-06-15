"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type DressStyleCardProps = {
    title: string;
    url: string;
    className?: string;
};

const DressStyleCard = ({ title, url, className }: DressStyleCardProps) => {
    return (
        <Link
            href={url}
            className={`w-full md:h-full rounded-[20px] bg-white bg-top text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover hover:scale-105 transition-transform duration-300 ${className || ""}`}
            style={{ fontFamily: 'Integral CF', fontWeight: 700 }}
        >
            {title}
        </Link>
    );
};

const DressStyle = () => {
    return (
        <div className="px-4 xl:px-0">
            <section className="max-w-screen-xl mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
                {/* Animated Heading */}
                <motion.h2
                    initial={{ y: "100px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize font-bold"
                    style={{ fontFamily: 'Integral CF', fontWeight: 700 }}
                >
                    BROWSE BY DRESS STYLE
                </motion.h2>

                {/* First Row - Animated */}
                <motion.div
                    initial={{ y: "100px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
                >
                    <DressStyleCard
                        title="Casual"
                        url="/casual"
                        className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-1.png')]"
                    />
                    <DressStyleCard
                        title="Formal"
                        url="/shop#formal"
                        className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-2.png')]"
                    />
                </motion.div>

                {/* Second Row - Animated */}
                <motion.div
                    initial={{ y: "100px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
                >
                    <DressStyleCard
                        title="Party"
                        url="/shop#party"
                        className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-3.png')]"
                    />
                    <DressStyleCard
                        title="Gym"
                        url="/shop#gym"
                        className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-4.png')]"
                    />
                </motion.div>
            </section>
        </div>
    );
};

export default DressStyle;