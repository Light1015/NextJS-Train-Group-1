"use client";
import React from "react";

interface SizeButtonProps {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

function SizeButton({ sizes, selectedSize, setSelectedSize }: SizeButtonProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size, index) => (
        <button
          key={index}
          onClick={() => setSelectedSize(size)}
          className={`py-2.5 px-4 text-sm rounded-full cursor-pointer transition-colors duration-200 ${
            size === selectedSize
              ? "text-white bg-black"
              : "bg-gray-200 text-gray-600"
          } hover:text-white hover:bg-black`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export default SizeButton;
