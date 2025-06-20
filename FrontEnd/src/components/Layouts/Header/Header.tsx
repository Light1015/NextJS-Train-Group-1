'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { MdSearch, MdMenu } from 'react-icons/md';
import { IoClose, IoChevronDownSharp } from 'react-icons/io5';
import InputField from '@/components/UI/InputField/InputField';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUserCircleBold } from 'react-icons/pi';
import Dropdown from "@/components/UI/Dropdown/Dropdown";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const links = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

    // Dropdown items với 4 mục để hiển thị 2x2 grid
    const dropdownItems = [
        {
            label: "Casual",
            description: "In attractive and spectacular colors and designs",
            onClick: () => window.location.href = "/casual"
        },
        {
            label: "Formal",
            description: "Ladies, your style and tastes are important to us",
            onClick: () => window.location.href = "/formal"
        },
        {
            label: "Party",
            description: "For all ages, with happy and beautiful colors",
            onClick: () => window.location.href = "/party"
        },
        {
            label: "Gym",
            description: "Suitable for men, women and all tastes and styles",
            onClick: () => window.location.href = "/gym"
        },
    ];


    return (
        <>
            {/* Top Banner */}
            {showBanner && (
                <div className="fixed top-0 left-0 w-full h-[38px] bg-black text-white flex justify-center items-center font-sans text-xs sm:text-sm z-[1000] px-4">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        Sign up and get 20% off your first order.
                        <Link href="#" className="underline ml-1">Sign Up Now</Link>
                    </p>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 text-white text-lg hidden md:block right-[100px]"
                        onClick={() => setShowBanner(false)}
                        aria-label="Close banner"
                    >
                        <IoClose />
                    </button>
                </div>
            )}

            {/* Header Navigation */}
            <div className={`w-full h-16 fixed z-[999] bg-white transition-all duration-300 ${showBanner ? 'top-[38px]' : 'top-0'} border-b border-gray-200`}>
                <nav className="flex items-center justify-between h-full pl-[120px] pr-[20px] gap-[30px]">

                    {/* Logo & Menu */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            className="block md:hidden cursor-pointer"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <MdMenu size={26} />
                        </button>
                        <Link href="/homepage" passHref>
                            <Image src="/images/SHOP.CO.png" alt="SHOP.CO" width={160} height={22} className="font-bold" />
                        </Link>
                    </div>

                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center gap-12">
                        {links.map((link, index) =>
                            index === 0 ? (
                                <Dropdown
                                    key="dropdown-menu"
                                    title={link}
                                    items={dropdownItems}
                                    buttonClassName="text-black hover:text-gray-600 font-normal"
                                />
                            ) : (
                                <Link
                                    key={link}
                                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                                    className="text-black hover:text-gray-600 font-normal"
                                >
                                    {link}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex flex-1 max-w-[577px] mx-12">
                        <div className="relative w-full">
                            <MdSearch size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6 shrink-0 mr-[100px]">

                        {/* Mobile Search Icon */}
                        <button className="block lg:hidden">
                            <MdSearch size={24} className="text-black" />
                        </button>

                        <Link href="/cart" className="relative">
                            <FiShoppingCart size={24} className="text-black hover:text-gray-600" />
                        </Link>

                        <button>
                            <PiUserCircleBold size={24} className="text-black hover:text-gray-600" />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 z-50 ${showMenu ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col py-4 px-6 space-y-4">
                        {links.map((link, index) =>
                            index === 0 ? (
                                <Dropdown
                                    key="mobile-dropdown-menu"
                                    title={link}
                                    items={dropdownItems}
                                    buttonClassName="text-black hover:text-gray-600 font-normal text-left justify-start"
                                />
                            ) : (
                                <Link
                                    key={link}
                                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setShowMenu(false)}
                                    className="text-black hover:text-gray-600 font-normal py-2"
                                >
                                    {link}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;