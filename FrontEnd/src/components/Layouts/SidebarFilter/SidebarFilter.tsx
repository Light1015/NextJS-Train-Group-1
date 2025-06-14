"use client";

import Image from "next/image";
import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

import SizeButton from "@/components/UI/SizeButton/SizeButton";
import ColorsList from "@/components/UI/ColorsList/ColorsList";
import PriceRange from "@/components/UI/PriceRange/PriceRange";

interface SidebarFilterProps {
    showSideBar: boolean;
    setshowSideBar: (show: boolean) => void;
}

const SidebarFilter = ({ showSideBar, setshowSideBar }: SidebarFilterProps) => {
    const [active, setActive] = useState("color");

    const colors = ["green", "red", "yellow", "orange", "cyan", "blue", "purple", "pink", "white", "black"];
    const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

    return (
        <div
            className={`bg-white border border-gray-200 p-4 z-50
    transition-transform duration-300 transform rounded-xl h-fit
    md:sticky md:top-0 md:w-64 md:rounded-xl md:translate-x-0 md:relative

    fixed md:relative
    top-[93px] left-1/2 -translate-x-1/2
    w-[390px] h-[1066px] rounded-t-[20px]
    ${showSideBar ? "translate-y-0" : "-translate-x-full"}`}
        >


            <div className="flex flex-col gap-2 pb-3 border-b border-gray-200">
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        Filters
                        {/* Close icon - only mobile */}
                        <Image
                            src="/images/cross.webp"
                            alt="close filter"
                            width={24}
                            height={24}
                            className="cursor-pointer md:hidden absolute right-5"
                            onClick={() => setshowSideBar(false)}
                        />
                    </h2>

                    {/* Filter icon - only desktop */}
                    <Image
                        src="/images/filter.webp"
                        alt="filter icon"
                        width={24}
                        height={24}
                        className="hidden md:block"
                    />
                </div>

            </div>


            {/* Categories */}
            <div className="py-3 border-b border-gray-200">
                {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
                    <div
                        key={item}
                        className="text-gray-600 p-2 transition-all duration-300 rounded-md cursor-pointer hover:bg-black hover:text-white flex justify-between"
                    >
                        {item}
                        <BsChevronRight className="text-gray-500 cursor-pointer" />
                    </div>
                ))}
            </div>

            {/* Price */}
            <div className="mt-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Price</h3>
                    <BsChevronDown onClick={() => setActive("price")} className="text-gray-500 cursor-pointer" />
                </div>
                <div className={`${active === "price" ? "max-h-screen" : "max-h-0"} transition-all duration-500 overflow-hidden`}>
                    <PriceRange />
                </div>
            </div>

            {/* Colors */}
            <div className="mt-4 border-b border-gray-200">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Colors</h3>
                    <BsChevronDown onClick={() => setActive("color")} className="text-gray-500 cursor-pointer" />
                </div>
                <div className={`${active === "color" ? "max-h-screen" : "max-h-0"} transition-all duration-500 overflow-hidden`}>
                    <ColorsList colors={colors} />
                </div>
            </div>

            {/* Size */}
            <div className="mt-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Size</h3>
                    <BsChevronDown onClick={() => setActive("size")} className="text-gray-500 cursor-pointer" />
                </div>
                <div className={`${active === "size" ? "max-h-screen" : "max-h-0"} transition-all duration-500 overflow-hidden`}>
                    <SizeButton sizes={sizes} />
                </div>
            </div>

            {/* Style */}
            <div className="mt-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Dress Style</h3>
                    <BsChevronDown onClick={() => setActive("style")} className="text-gray-500 cursor-pointer" />
                </div>
                <div className={`${active === "style" ? "max-h-screen" : "max-h-0"} transition-all duration-500 overflow-hidden`}>
                    {["Casual", "Formal", "Party", "Gym"].map((style) => (
                        <div
                            key={style}
                            className="p-2 transition-all rounded-md duration-300 text-gray-600 cursor-pointer hover:bg-black hover:text-white mt-2 flex justify-between"
                        >
                            {style}
                            <BsChevronRight className="text-gray-500 cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button className="w-full max-w-[247px] px-[54px] py-4 rounded-[62px] bg-black text-white hover:bg-gray-800 transition-all duration-300">
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default SidebarFilter;
