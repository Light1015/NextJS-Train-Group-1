"use client";

import { useState } from "react";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";

// Make sure the path is correct; adjust if necessary:
import SizeButton from "/UI/SizeButton";
import ColorsList from "/UI/ColorsList/ColorsList";

import cross from "../../assets/cross.svg";

interface SidebarFilterProps {
    showSideBar: boolean;
    setshowSideBar: (show: boolean) => void;
}

const SidebarFilter = ({ showSideBar, setshowSideBar }: SidebarFilterProps) => {
    const [price, setPrice] = useState([50, 1000]);
    const [active, setActive] = useState("color");

    const colors = ["green", "red", "yellow", "orange", "pink", "blue", "black", "white"];
    const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

    return (
        <div
            className={`position-fixed top-0 start-0 p-4 bg-white border rounded shadow z-50 ${showSideBar ? "" : "d-none d-md-block"
                }`}
            style={{ width: "100%", maxWidth: "260px", top: "4rem" }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h5 className="mb-0">Filters</h5>
                <div
                    className="d-md-none"
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    onClick={() => setshowSideBar(false)}
                >
                    <Image src={cross} alt="close sidebar" width={16} height={16} />
                </div>
            </div>

            {/* Categories */}
            <div className="border-bottom pb-3 mb-3">
                {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
                    <div
                        key={item}
                        className="text-secondary p-2 rounded"
                        style={{ cursor: "pointer" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#000")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "")}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Price Filter */}
            <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <strong>Price</strong>
                    <BsChevronDown onClick={() => setActive("price")} style={{ cursor: "pointer" }} />
                </div>
                <div className={active === "price" ? "mt-2" : "d-none"}>
                    <input
                        type="range"
                        className="form-range"
                        min="50"
                        max="1000"
                        value={price[0]}
                        onChange={(e) => setPrice([Number(e.target.value), price[1]])}
                    />
                    <div className="d-flex justify-content-between text-muted small">
                        <span>${price[0]}</span> <span>${price[1]}</span>
                    </div>
                </div>
            </div>

            {/* Colors */}
            <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <strong>Colors</strong>
                    <BsChevronDown onClick={() => setActive("color")} style={{ cursor: "pointer" }} />
                </div>
                <div className={active === "color" ? "mt-2" : "d-none"}>
                    <ColorsList colors={colors} />
                </div>
            </div>

            {/* Sizes */}
            <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <strong>Size</strong>
                    <BsChevronDown onClick={() => setActive("size")} style={{ cursor: "pointer" }} />
                </div>
                <div className={active === "size" ? "mt-2" : "d-none"}>
                    <SizeButton sizes={sizes} />
                </div>
            </div>

            {/* Dress Style */}
            <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <strong>Dress Style</strong>
                    <BsChevronDown onClick={() => setActive("style")} style={{ cursor: "pointer" }} />
                </div>
                <div className={active === "style" ? "mt-2" : "d-none"}>
                    {["Casual", "Formal", "Party", "Gym"].map((style) => (
                        <div
                            key={style}
                            className="p-2 rounded text-secondary mt-2"
                            style={{ cursor: "pointer" }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#000";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "";
                                e.currentTarget.style.color = "";
                            }}
                        >
                            {style}
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <button className="btn btn-dark w-100 mt-3">Apply Filter</button>
        </div>
    );
};

export default SidebarFilter;
