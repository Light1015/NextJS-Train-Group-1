"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface DropdownItem {
    label: string;
    description: string;
    onClick: () => void;
}

interface DropdownProps {
    title: string;
    items: DropdownItem[];
    buttonClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, buttonClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-base font-medium ${buttonClassName || ""}`}
            >
                <span>{title}</span>
                <IoChevronDownSharp
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 z-30 mt-3 w-[400px] rounded-xl bg-white shadow-lg ring-1 ring-black/5 border border-gray-100">
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            {items.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        item.onClick();
                                        setIsOpen(false);
                                    }}
                                    className="text-left hover:opacity-90 transition-opacity"
                                >
                                    <h3 className="font-semibold text-gray-900 text-base mb-2">
                                        {item.label}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
