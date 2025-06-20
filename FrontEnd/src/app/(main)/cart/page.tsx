'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Title from "@/components/UI/Title/Title";
import QuantityCounter from "@/components/UI/QuantityCounter/QuantityCounter";
import InputField from "@/components/UI/InputField/InputField";
import Button from "@/components/UI/Button/Button";

function Cart() {
    const { items, updateQuantity, removeItem } = useCart();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;
    return (
        <div className="p- container mx-auto">
            <Title title="your cart" classes="text-left mb-5" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
                <div className="lg:col-span-3 space-y-4 border p-3 border-gray-200 rounded-lg">
                    {items.map((item, index) => (
                        <div
                            key={`${item.id}-${item.size}-${item.color}-${index}`}
                            className="flex gap-4 border-b border-gray-200 py-4 items-start"
                        >
                            {/* Image */}
                            <div className="w-20 h-20 flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded object-cover w-full h-full"
                                />
                            </div>

                            {/* Details + Counter */}
                            <div className="flex-1">
                                {/* Top row: name + trash */}
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-sm leading-snug">
                                        {item.name}
                                    </h3>
                                    <button
                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                        className="text-[#FF3333] cursor-pointer"
                                    >
                                        <FaRegTrashCan size={18} />
                                    </button>
                                </div>

                                {/* Size and color */}
                                <p className="text-sm text-gray-600">
                                    Size: {item.size}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Color: {item.color}
                                </p>

                                {/* Price + Quantity */}
                                <div className="flex items-center justify-between mt-1">
                                    <span className="font-bold text-base">${item.price}</span>
                                    <QuantityCounter
                                        currentQuantity={item.quantity}
                                        onDecrement={() => updateQuantity(item.id, item.size, item.color, -1)}
                                        onIncrement={() => updateQuantity(item.id, item.size, item.color, 1)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="p-6 h-fit lg:sticky top-0 lg:col-span-2 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2 py-2 mb-3 border-b border-gray-200">
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-light">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span className="text-gray-500 font-light">Discount (-20%)</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-light">Delivery Fee</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex mb-4 justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 my-2">
                        <InputField placeholder="Add Promo Code" />
                        <Button
                            title="Apply"
                            classes="bg-black text-white w-full md:w-fit"
                        />
                    </div>
                    <button className="w-full rounded-full mt-4 p-3 bg-black text-white flex items-center justify-center">
                        Go to Checkout <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
