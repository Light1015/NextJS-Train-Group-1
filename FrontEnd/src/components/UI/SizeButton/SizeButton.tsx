import React, { useState } from "react";

interface SizeButtonProps {
    sizes: string[];
}

const SizeButton: React.FC<SizeButtonProps> = ({ sizes }) => {
    const [currentSize, setCurrentSize] = useState<string>("Large");

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((size, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSize(size)}
                    className={`py-2 px-3 text-xs rounded-full cursor-pointer ${size === currentSize
                            ? "text-white bg-black"
                            : "bg-gray-200 text-gray-500"
                        } hover:text-white hover:bg-black`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default SizeButton;
