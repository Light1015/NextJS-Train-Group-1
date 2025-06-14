"use client";

import React from "react";

const HolyLoader = ({ color = "#000" }: { color?: string }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60">
            <div
                className="w-10 h-10 border-4 border-solid rounded-full animate-spin"
                style={{
                    borderTopColor: color,
                    borderRightColor: "transparent",
                    borderBottomColor: "transparent",
                    borderLeftColor: "transparent",
                }}
            ></div>
        </div>
    );
};

export default HolyLoader;
