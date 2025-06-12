"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";

import SizeButton from "@/components/UI/SizeButton/SizeButton";
import ColorsList from "@/components/UI/ColorsList/ColorsList";

import styles from "./SidebarFilter.module.scss";

interface SidebarFilterProps {
    showSideBar: boolean;
    setshowSideBar: (show: boolean) => void;
}

const SidebarFilter = ({ showSideBar, setshowSideBar }: SidebarFilterProps) => {
    const [price, setPrice] = useState({ min: 0, max: 250 });
    const [trackStyle, setTrackStyle] = useState("");

    const rangeMin = 0;
    const rangeMax = 250;

    const getPercent = (value: number) => Math.round(((value - rangeMin) / (rangeMax - rangeMin)) * 100);

    useEffect(() => {
        const minPercent = getPercent(price.min);
        const maxPercent = getPercent(price.max);

        const gradient = `linear-gradient(
            to right,
            #dee2e6 ${minPercent}%,
            #212529 ${minPercent}%,
            #212529 ${maxPercent}%,
            #dee2e6 ${maxPercent}%
        )`;
        setTrackStyle(gradient);
    }, [price]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= price.max) return;
        setPrice(prev => ({ ...prev, min: value }));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value <= price.min) return;
        setPrice(prev => ({ ...prev, max: value }));
    };

    const [active, setActive] = useState("color");

    const colors = ["green", "red", "yellow", "orange", "cyan", "blue", "purple", "pink", "white", "black"];
    const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

    return (
        <div
            className={`${styles.sidebarFilter} ${!showSideBar ? styles.hidden : ""}`}
        >
            {/* Header */}
            <div className={styles.header}>
                <h5 className="mb-0">Filters</h5>
                <div className={`${styles.close} d-md-none`} onClick={() => setshowSideBar(false)}>
                    <Image src="/images/filter.svg" alt="close sidebar" width={24} height={24} />
                </div>
            </div>

            {/* Categories */}
            <div className={styles.section}>
                {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
                    <div key={item} className={styles.item}>{item} <Image src="/images/right.svg" alt="close sidebar" width={16} height={16} /></div>
                ))}
            </div>

            {/* Price Filter */}
            <div className={styles.section}>
                <div className={styles.title}>
                    <strong>Price</strong>
                    <BsChevronDown onClick={() => setActive("price")} />
                </div>
                <div className={styles.rangeSlider}>
                    <div className={styles.background} />
                    <div
                        className={styles.track}
                        style={{
                            left: `${(price.min / 250) * 100}%`,
                            width: `${((price.max - price.min) / 250) * 100}%`,
                        }}
                    />

                    <input
                        type="range"
                        min="0"
                        max="250"
                        value={price.min}
                        onChange={handleMinChange}
                        className={styles.thumb}
                    />
                    <input
                        type="range"
                        min="0"
                        max="250"
                        value={price.max}
                        onChange={handleMaxChange}
                        className={styles.thumb}
                    />

                    <span
                        className={styles.priceLabel}
                        style={{ left: `calc(${(price.min / 250) * 100}% - 12px)` }}
                    >
                        ${price.min}
                    </span>
                    <span
                        className={styles.priceLabel}
                        style={{ left: `calc(${(price.max / 250) * 100}% - 12px)` }}
                    >
                        ${price.max}
                    </span>
                </div>



            </div>

            {/* Colors */}
            <div className={styles.section}>
                <div className={styles.title}>
                    <strong>Colors</strong>
                    <BsChevronDown onClick={() => setActive("color")} />
                </div>
                <div className={active === "color" ? styles.content : "d-none"}>
                    <ColorsList colors={colors} />
                </div>
            </div>

            {/* Sizes */}
            <div className={styles.section}>
                <div className={styles.title}>
                    <strong>Size</strong>
                    <BsChevronDown onClick={() => setActive("size")} />
                </div>
                <div className={active === "size" ? styles.content : "d-none"}>
                    <SizeButton sizes={sizes} />
                </div>
            </div>

            {/* Dress Style */}
            <div className={styles.section}>
                <div className={styles.title}>
                    <strong>Dress Style</strong>
                    <BsChevronDown onClick={() => setActive("style")} />
                </div>
                <div className={active === "style" ? styles.content : "d-none"}>
                    {["Casual", "Formal", "Party", "Gym"].map((style) => (
                        <div key={style} className={styles.style}>
                            {style} <Image src="/images/right.svg" alt="close sidebar" width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <button className={styles.applyButton}>Apply Filter</button>

        </div>
    );
};

export default SidebarFilter;
