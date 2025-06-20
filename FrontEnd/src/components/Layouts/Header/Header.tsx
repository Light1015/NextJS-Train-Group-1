'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu, MdSearch } from 'react-icons/md';
import { IoClose, IoChevronDownSharp } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUserCircleBold } from 'react-icons/pi';
import LoginPopup from '@/components/Login/login';
import InputField from '@/components/UI/InputField/InputField';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const links = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

  return (
    <>
      {/* Top Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 w-full h-[38px] bg-black text-white flex justify-center items-center text-xs sm:text-sm z-[1000] px-4">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            Sign up and get 20% off your first order.
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowLogin(true);
              }}
              className="underline ml-1"
            >
              Sign Up Now
            </Link>
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

      {/* Header */}
      <header
        className={`w-full h-16 fixed z-[999] bg-white transition-all duration-300 ${
          showBanner ? 'top-[38px]' : 'top-0'
        }`}
      >
        <nav className="flex items-center justify-between h-full px-[20px] lg:px-[100px] gap-[20px] lg:gap-[40px]">
          {/* Logo & Burger Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="block md:hidden" onClick={() => setShowMenu(!showMenu)}>
              <MdMenu size={26} />
            </button>
            <Link href="/homepage">
              <Image src="/images/SHOP.CO.png" alt="Shop.co Logo" width={160} height={22} />
            </Link>
          </div>

          {/* Nav Links */}
          <div
            className={`absolute md:static top-16 left-0 w-full md:w-fit h-screen md:h-auto z-50 flex-col md:flex-row bg-white md:flex items-center ${
              showMenu ? 'flex' : 'hidden'
            } gap-[24px]`}
          >
            {links.map((link, index) => (
              <Link
                key={link}
                href={`/casual/${link}`}
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-1 hover:text-gray-600 capitalize"
              >
                <span>{link}</span>
                {index === 0 && <IoChevronDownSharp size={16} />}
              </Link>
            ))}
          </div>

          {/* Search (desktop only) */}
          <div className="hidden lg:flex shrink-0">
            <InputField
              icon={<MdSearch size={24} color="gray" />}
              classes="w-[577px] h-[48px] px-[16px] py-[12px] gap-[12px] rounded-[62px] border border-gray-300"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 shrink-0">
            <button className="block lg:hidden">
              <MdSearch size={24} className="text-gray-700" />
            </button>

            <Link href="/cart/">
              <FiShoppingCart className="text-xl cursor-pointer hover:text-gray-600" />
            </Link>

            <button onClick={() => setShowLogin(true)} aria-label="Open login popup">
              <PiUserCircleBold className="text-xl cursor-pointer hover:text-gray-600" />
            </button>
          </div>
        </nav>

        {/* Divider Line */}
        <div className="w-full max-w-[1240px] h-px border border-[#0000001A] mx-auto" />
      </header>

      {/* Login Popup */}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
