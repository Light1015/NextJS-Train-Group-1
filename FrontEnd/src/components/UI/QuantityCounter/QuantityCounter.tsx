import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantityCounterProps {
    currentQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

function QuantityCounter({
    currentQuantity,
    onIncrement,
    onDecrement,
}: QuantityCounterProps) {
    return (
        <div className="flex items-center w-30 py-2 justify-between rounded-full bg-gray-200 text-gray-900 overflow-hidden">
            <button className="px-2" onClick={onDecrement}>
                <FaMinus />
            </button>
            <span className="px-2">{currentQuantity}</span>
            <button className="px-2" onClick={onIncrement}>
                <FaPlus />
            </button>
        </div>
    );
}

export default QuantityCounter;
