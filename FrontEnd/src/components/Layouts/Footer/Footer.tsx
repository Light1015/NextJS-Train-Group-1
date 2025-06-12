"use client";

import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/UI/Newsletter/Newsletter";

function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Newsletter */}
            <Newsletter />

            {/* Footer Grid */}
            <div className={styles.footer_grid}>
                <div className={styles.column}>
                    <Link href="/" className={styles.logo}>SHOP.CO</Link>
                    <p>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                    <div className={styles.social_icons}>
                        <Image src="/images/twitter.svg" alt="twitter" width={28} height={28} />
                        <Image src="/images/facebook.svg" alt="facebook" width={28} height={28} />
                        <Image src="/images/instagram.svg" alt="instagram" width={28} height={28} />
                        <Image src="/images/github.svg" alt="github" width={28} height={28} />
                    </div>
                </div>

                <div className={styles.column}>
                    <h4>Company</h4>
                    <ul>
                        <li>About</li>
                        <li>Features</li>
                        <li>Works</li>
                        <li>Career</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Help</h4>
                    <ul>
                        <li>Customer Support</li>
                        <li>Delivery Details</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>FAQ</h4>
                    <ul>
                        <li>Account</li>
                        <li>Manage Deliveries</li>
                        <li>Orders</li>
                        <li>Payments</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Resources</h4>
                    <ul>
                        <li>Free eBooks</li>
                        <li>Development Tutorial</li>
                        <li>How to - Blog</li>
                        <li>Youtube Playlist</li>
                    </ul>
                </div>
            </div>

            {/* Footer bottom */}
            <div className={styles.footer_bottom}>
                <p>Shop.co © 2000-2023, All Rights Reserved</p>
                <div className={styles.payment_icons}>
                    <Image src="/images/visa.svg" alt="Visa" width={46.61} height={30.030} />
                    <Image src="/images/mastercard.svg" alt="MasterCard" width={46.61} height={30.030} />
                    <Image src="/images/paypal.svg" alt="PayPal" width={46.61} height={30.030} />
                    <Image src="/images/applepay.svg" alt="ApplePay" width={46.61} height={30.030} />
                    <Image src="/images/googlepay.svg" alt="GooglePay" width={46.61} height={30.030} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
