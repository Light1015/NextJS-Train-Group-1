"use client";

import React from "react";

interface ColorsListProps {
    colors: string[];
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

function darkenColor(color: string, percent: number) {
    // Áp dụng simple RGB darken (hoạt động tốt với tên màu, hex, rgb)
    try {
        const ctx = document.createElement("canvas").getContext("2d");
        if (!ctx) return color;
        ctx.fillStyle = color;
        const rgb = ctx.fillStyle;

        const hex = rgbToHex(rgb);
        const r = Math.floor(parseInt(hex.substring(1, 3), 16) * (1 - percent));
        const g = Math.floor(parseInt(hex.substring(3, 5), 16) * (1 - percent));
        const b = Math.floor(parseInt(hex.substring(5, 7), 16) * (1 - percent));

        return `rgb(${r}, ${g}, ${b})`;
    } catch {
        return color;
    }
}

function rgbToHex(rgb: string) {
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    return (
        "#" +
        result
            .slice(0, 3)
            .map((x) => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}
function ColorsList({ colors, selectedColor, setSelectedColor }: ColorsListProps) {
    return (
        <div className="flex flex-wrap gap-[1rem] mt-2 pb-4">
            {colors.map((color) => {
                const isSelected = selectedColor === color;

                let borderStyle = "none";
                if (isSelected) {
                    borderStyle = "1px solid black";
                } else if (color.toLowerCase() === "white") {
                    borderStyle = "1.5px solid #ccc";
                }

                return (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className="w-6 h-6 rounded-full transition-all duration-300 outline-none ring-offset-2 relative flex items-center justify-center"
                        style={{
                            backgroundColor: color,
                            border: borderStyle,
                        }}
                        aria-label={`Select ${color}`}
                    >
                        {isSelected && (
                            <span
                                className={`text-[10px] font-bold ${color.toLowerCase() === "white" ? "text-black" : "text-white"
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
}

export default ColorsList;
