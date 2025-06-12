"use client"; // nếu dùng App Router (Next.js 13+)

import React, { useState } from "react";

interface ColorsListProps {
    colors: string[];
}

function ColorsList({ colors }: ColorsListProps) {
    const [selectedColor, setSelectedColor] = useState("olive");

    return (
        <div className="d-flex flex-wrap gap-2 mt-2 pb-4">
            {colors.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-circle border ${selectedColor === color ? "border-dark" : "border-light"
                        }`}
                    style={{
                        backgroundColor: color,
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        transition: "opacity 0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                />
            ))}
        </div>
    );
}

export default ColorsList;
