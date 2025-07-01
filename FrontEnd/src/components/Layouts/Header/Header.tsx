'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdMenu, MdSearch } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUserCircleBold } from 'react-icons/pi';

import Dropdown from '@/components/UI/Dropdown/Dropdown';
import LoginPopup, { getCurrentUser, logout } from '@/components/Login/Login';
import RegisterPopup from '@/components/RegisterPopup/RegisterPopup';
import InputField from '@/components/UI/InputField/InputField';
import { useProducts } from '@/hooks/useProducts';
import { Product } from "@/types/product.types";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { products = [] } = useProducts();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products
        .filter(product =>
          product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && product.image !== null
        )
        .map(product => ({
          ...product,
          image: product.image as string,
          price: typeof product.price === 'string' ? Number(product.price) : product.price,
          old_price: product.old_price !== undefined && typeof product.old_price === 'string'
            ? Number(product.old_price)
            : product.old_price
        }));
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const links = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];
  const dropdownItems = [
    { label: 'Casual', description: 'Casual wear', onClick: () => router.push('/casual') },
    { label: 'Formal', description: 'Formal outfits', onClick: () => router.push('/formal') },
    { label: 'Party', description: 'Party style', onClick: () => router.push('/party') },
    { label: 'Gym', description: 'Gym gear', onClick: () => router.push('/gym') },
  ];

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 w-full h-10 bg-black text-white flex justify-center items-center text-sm z-[1000] px-4">
          <p>
            Sign up and get 20% off your first order.
            <Link href="#" onClick={(e) => { e.preventDefault(); setShowRegister(true); }} className="underline ml-1">
              Sign Up Now
            </Link>
          </p>
          <button className="absolute top-1/2 -translate-y-1/2 right-24 text-white hidden md:block" onClick={() => setShowBanner(false)}>
            <IoClose />
          </button>
        </div>
      )}

      <header className={`w-full h-16 fixed z-[999] bg-white transition-all duration-300 ${showBanner ? 'top-10' : 'top-0'}`}>
        <nav className="flex items-center justify-between h-full px-5 lg:px-24 gap-5">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
              <MdMenu size={26} />
            </button>
            <Link href="/homepage">
              <Image src="/images/SHOP.CO.png" alt="Logo" width={160} height={22} />
            </Link>
          </div>

          <div className={`absolute md:static top-16 left-0 w-full md:w-auto h-screen md:h-auto z-50 flex-col md:flex-row bg-white md:flex items-center ${showMenu ? 'flex' : 'hidden'} gap-6`}>
            {links.map((link, index) =>
              index === 0 ? (
                <Dropdown key="dropdown" title={link} items={dropdownItems} buttonClassName="text-black hover:text-gray-600 font-normal" />
              ) : (
                <Link key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} onClick={() => setShowMenu(false)} className="hover:text-gray-600 capitalize">
                  {link}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex relative w-[577px]">
            <InputField
              icon={<MdSearch size={24} color="gray" />}
              classes="w-full h-12 px-4 py-3 rounded-full border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredProducts.length > 0 && (
              <div className="absolute top-[52px] left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSearchTerm('');
                      setFilteredProducts([]);
                      router.push(`/product/${product.id}`);
                    }}
                  >
                    <Image src={product.image} alt={product.name} width={40} height={40} className="rounded object-cover" />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.discount ? (
                          <>
                            <span className="line-through mr-1">${product.old_price}</span>
                            <span className="text-red-500">${product.price}</span>
                          </>
                        ) : (
                          <span>${product.price}</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <MdSearch size={24} className="text-gray-700" />
            </button>
            <Link href="/cart">
              <FiShoppingCart className="text-xl hover:text-gray-600" />
            </Link>

            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-sm font-medium hover:text-gray-700"
                >
                  {currentUser.name || currentUser.email}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)}>
                <PiUserCircleBold className="text-xl hover:text-gray-600" />
              </button>
            )}
          </div>
        </nav>
        <div className="w-full max-w-[1240px] h-px border border-[#0000001A] mx-auto" />
      </header>

      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <RegisterPopup
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Header;
