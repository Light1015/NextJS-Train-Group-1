"use client";
import React from "react";

interface SizeButtonProps {
    sizes: string[];
}

function SizeButton({ sizes }: SizeButtonProps) {
    const [currentSize, setCurrentSize] = React.useState("Large");

    return (
        <div className="flex flex-wrap gap-3">
            {sizes.map((size, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentSize(size)}
                        className={`py-2.5 px-4 text-sm rounded-full cursor-pointer transition-colors duration-200 ${
                            size === currentSize
                                ? "text-white bg-black"
                                : "bg-gray-200 text-gray-600"
                        } hover:text-white hover:bg-black`}
                    >
                        {size}
                    </button>
                );
            })}
        </div>
    );
}

export default SizeButton;
