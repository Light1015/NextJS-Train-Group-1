import React, { useState } from "react";

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    onChange: (values: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
    minPrice,
    maxPrice,
    onChange,
}) => {
    const [values, setValues] = useState<[number, number]>([minPrice, maxPrice]);

    const handleChange = (index: number, value: number) => {
        const newValues = [...values] as [number, number];
        newValues[index] = Math.min(Math.max(value, minPrice), maxPrice);

        if (index === 0 && newValues[0] > newValues[1]) newValues[0] = newValues[1];
        if (index === 1 && newValues[1] < newValues[0]) newValues[1] = newValues[0];

        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div className="w-full p-4">
            <div className="relative h-2 bg-gray-300 rounded-full">
                <div
                    className="absolute h-2 z-40 bg-blue-500 rounded-full"
                    style={{
                        left: `${((values[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        right: `${100 - ((values[1] - minPrice) / (maxPrice - minPrice)) * 100
                            }%`,
                    }}
                ></div>
                {[0, 1].map((index) => (
                    <input
                        key={index}
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={values[index]}
                        onChange={(e) => handleChange(index, Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
                        style={{ top: "-5px" }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-700">${values[0]}</span>
                <span className="text-gray-700">${values[1]}</span>
            </div>
        </div>
    );
};

export default PriceFilter;
