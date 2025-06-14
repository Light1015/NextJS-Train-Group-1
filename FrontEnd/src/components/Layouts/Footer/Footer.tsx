"use client";

import Link from "next/link";
import Image from "next/image";
import InputField from "@/components/UI/InputField/InputField";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import React from "react";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
    const footerLinks = [
        { title: "COMPANY", items: ["About", "Features", "Works", "Career"] },
        {
            title: "HELP",
            items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
        },
        {
            title: "FAQ",
            items: [
                { label: "Account", href: "/user" },
                { label: "Manage Deliveries", href: "/casual" },
                { label: "Orders", href: "/cart" },
                { label: "Payments", href: "/cart" },
            ],
            isLinked: true,
        },
        {
            title: "RESOURCES",
            items: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
        },
    ];

    return (
        <div className="bg-gray-100 pt-20 mt-40 font-sans">
            {/* Newsletter */}
            <div className="relative z-10">
                <div className="bg-black text-white rounded-[20px] mx-auto -mt-40 mb-6 px-4 py-6 w-[90%] max-w-[1240px] md:px-[101px] md:py-[36px] flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto]">
                    <Title
                        title={
                            <>
                                STAY UP TO DATE ABOUT <br />
                                OUR LATEST OFFERS
                            </>
                        }
                        classes="text-left font-bold text-[24px] leading-[30px] md:text-[40px] md:leading-[45px] font-[Integral_CF] max-w-[500px] md:max-w-[600px]"
                    />
                    <div className="flex flex-col gap-4 w-full md:w-[349px] md:ml-auto md:mr-[64px]">
                        <InputField
                            placeholder="Enter your email address"
                            icon={<TfiEmail color="gray" />}
                            classes="bg-white flex"
                        />
                        <Button
                            title="Subscribe to Newsletter"
                            classes="bg-white text-black w-full hover:bg-gray-200"
                        />
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="w-[90%] max-w-[1200px] mx-auto py-10 text-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
                    {/* Logo + mô tả + social */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                        <Image src="/images/SHOP.CO.svg" alt="shop.co logo" width={167} height={23} />
                        <p className="text-sm mt-2">
                            We have clothes that suit your style and which you're proud to wear. From women to men.
                        </p>
                        <ul className="flex gap-3 mt-3">
                            <Image src="/images/twitter.svg" alt="twitter" width={28} height={28} />
                            <Image src="/images/facebook.svg" alt="facebook" width={28} height={28} />
                            <Image src="/images/instagram.svg" alt="instagram" width={28} height={28} />
                            <Image src="/images/github.svg" alt="github" width={28} height={28} />
                        </ul>
                    </div>

                    {/* Các cột liên kết */}
                    {footerLinks.map((col, index) => (
                        <div key={index}>
                            <h4 className="font-[Satoshi] text-[16px] font-500">{col.title}</h4>
                            <ul className="font-[Satoshi] mt-6 text-sm flex flex-col gap-3">
                                {col.items.map((item, idx) => (
                                    <li key={idx}>
                                        {typeof item === "string" ? (
                                            item
                                        ) : (
                                            <Link href={item.href} className="hover:underline hover:text-black transition">
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    ))}

                </div>
            </div>


            {/* Bottom bar */}
            <div className="w-[90%] max-w-[1200px] mx-auto border-t border-gray-200 text-sm text-gray-500 py-6 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left md:items-center gap-4">
                <p>Shop.co © 2000-2023, All Rights Reserved</p>
                <div className="flex gap-2 flex-wrap justify-center">
                    <Image src="/images/visa.svg" alt="Visa" width={46.61} height={30.03} />
                    <Image src="/images/mastercard.svg" alt="MasterCard" width={46.61} height={30.03} />
                    <Image src="/images/paypal.svg" alt="PayPal" width={46.61} height={30.03} />
                    <Image src="/images/applepay.svg" alt="ApplePay" width={46.61} height={30.03} />
                    <Image src="/images/googlepay.svg" alt="GooglePay" width={46.61} height={30.03} />
                </div>
            </div>

        </div>
    );
};

export default Footer;
