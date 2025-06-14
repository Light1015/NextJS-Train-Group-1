"use client";
import Image from "next/image";
import styles from "./Newsletter.module.scss";

export default function Newsletter() {
    return (
        <section className={styles.newsletter}>
            <div className={styles.news_wrapper}>
                <h1 className={styles.news_title}>
                    STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
                </h1>
                <div className={styles.news_form}>
                    <div className={styles.input_container}>
                        <Image src="/images/mail.webp" alt="mail" width={20} height={20} />
                        <input type="text" placeholder="Enter your email address" />
                    </div>
                    <button className={styles.subscribe_button}>Subscribe to Newsletter</button>
                </div>
            </div>
        </section>
    );
}
