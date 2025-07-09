"use client";

import React from "react";

interface ColorsListProps {
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

function isValidColor(color: string): boolean {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
}

const ColorsList = ({ colors, selectedColor, setSelectedColor }: ColorsListProps) => {
  return (
    <div className="flex flex-wrap gap-4 mt-2 pb-4">
      {colors.map((color) => {
        const isSelected = selectedColor === color;
        const valid = isValidColor(color);

        const border =
          isSelected
            ? "1.5px solid black"
            : color.toLowerCase() === "white"
            ? "1.5px solid #ccc"
            : "none";

        return (
          <button
            key={color}
            onClick={() => setSelectedColor(isSelected ? "" : color)}
            className="w-6 h-6 rounded-full transition-all duration-300 outline-none ring-offset-2 flex items-center justify-center"
            style={{
              backgroundColor: valid ? color : "#ccc",
              border,
            }}
            aria-label={`Select ${color}`}
            title={color}
          >
            {isSelected && (
              <span
                className={`text-[10px] font-bold ${
                  color.toLowerCase() === "white" ? "text-black" : "text-white"
                }`}
              >
                ✔
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorsList;
