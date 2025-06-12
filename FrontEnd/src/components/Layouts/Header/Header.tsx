"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Header() {
    return (
        <>
            {/* Top Banner */}
            <div className={styles.topNav}>
                <div className={styles.topNavContainer}>
                    <p className={styles.topNavText}>
                        Sign up and get 20% off your first order.{" "}
                        <a href="#" className={styles.topNavLink}>
                            Sign Up Now
                        </a>
                    </p>
                </div>
                <button className={styles.topNavClose}>
                    <IoClose />
                </button>
            </div>

            {/* Header */}
            <header className={styles.headerWrapper}>
                <div className={styles.headerContent}>
                    <div className={styles.logoSection}>
                        <Link href="/">
                            <Image src="/images/SHOP.CO.svg" alt="Shop.co Logo" width={160} height={24} />
                        </Link>
                    </div>

                    <nav className={styles.nav}>
                        <Link href="/categories/">Shop <Image src="/images/dropdown.svg" alt="Shop.co Logo" width={11.51} height={6.5} /></Link>
                        <Link href="/casual/">On Sale</Link>
                        <Link href="/categories/">New Arrivals</Link>
                        <Link href="/categories/">Brands</Link>
                    </nav>

                    <div className={styles.searchBar}>
                        <MdSearch size={20} color="gray" />
                        <input type="text" placeholder="Search for products..." />
                    </div>

                    <div className={styles.actionGroup}>
                        <Link href="/cart">
                            <Image src="/images/cart.svg" alt="Cart" width={24} height={24} />
                        </Link>
                        <Link href="/account">
                            <Image src="/images/user.svg" alt="User" width={24} height={24} />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
