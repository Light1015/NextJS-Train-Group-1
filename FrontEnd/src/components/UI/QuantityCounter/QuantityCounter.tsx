import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
interface QuantityCounterProps {
    currentQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

function QuantityCounter({ currentQuantity }: QuantityCounterProps) {
    const [quantity, setQuantity] = React.useState(currentQuantity);
    return (
        <div className="flex items-center w-30 py-2 justify-between rounded-full  bg-gray-200 text-gray-900 overflow-hidden">
            <button
                className="px-2 "
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
                <FaMinus />
            </button>
            <span className="px-2 ">{quantity}</span>
            <button className="px-2 " onClick={() => setQuantity((prev) => prev + 1)}>
                <FaPlus />
            </button>
        </div>
    );
}

export default QuantityCounter;