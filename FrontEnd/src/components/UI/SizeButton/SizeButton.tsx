"use client"; // nếu bạn dùng Next.js App Router

import React, { useState } from "react";

function SizeButton({ sizes }: { sizes: string[] }) {
    const [currentSize, setCurrentSize] = useState("Large");

    return (
        <div className="d-flex flex-wrap gap-2">
            {sizes.map((size, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSize(size)}
                    className={`btn btn-sm rounded-pill ${size === currentSize ? "btn-dark text-white" : "btn-light text-muted"
                        }`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}

export default SizeButton;
