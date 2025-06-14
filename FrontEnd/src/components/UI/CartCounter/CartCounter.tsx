"use client";

import React, { useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";

type CartCounterProps = {
    isZeroDelete?: boolean;
    onAdd?: (value: number) => void;
    onRemove?: (value: number) => void;
    className?: string;
    initialValue?: number;
};

const CartCounter = ({
    isZeroDelete,
    onAdd,
    onRemove,
    className = "",
    initialValue = 1,
}: CartCounterProps) => {
    const [counter, setCounter] = useState<number>(initialValue);

    const addToCart = () => {
        const newCount = counter + 1;
        onAdd?.(newCount);
        setCounter(newCount);
    };

    const remove = () => {
        if ((counter === 1 && !isZeroDelete) || counter <= 0) return;

        const newCount = counter - 1;
        onRemove?.(newCount);
        if (newCount <= 0) return;
        setCounter(newCount);
    };

    return (
        <div
            className={`bg-[#F0F0F0] w-full min-w-[110px] max-w-[110px] sm:max-w-[170px] py-3 md:py-3.5 px-4 sm:px-5 rounded-full flex items-center justify-between ${className}`}
        >
            <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-5 w-5 sm:h-6 sm:w-6 text-xl hover:bg-transparent"
                onClick={remove}
            >
                <FaMinus />
            </Button>
            <span className="font-medium text-sm sm:text-base">
                {!isZeroDelete ? counter : initialValue}
            </span>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                className="h-5 w-5 sm:h-6 sm:w-6 text-xl hover:bg-transparent"
                onClick={addToCart}
            >
                <FaPlus />
            </Button>
        </div>
    );
};

export default CartCounter;
