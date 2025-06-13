import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const PriceRange = () => {
    const [price, setPrice] = useState<[number, number]>([50, 1000]);

    return (
        <div className="mt-4 pb-4 border-b border-dark">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Price</h3>
            </div>

            <div className="mt-4 px-1">
                <Slider
                    range
                    min={0}
                    max={1000}
                    defaultValue={price}
                    onChange={(value: number | number[]) => {
                        if (Array.isArray(value) && value.length === 2) {
                            setPrice([value[0], value[1]]);
                        }
                    }}
                    trackStyle={[{ backgroundColor: "#000" }]}
                    handleStyle={[
                        { borderColor: "#000", backgroundColor: "#000" },
                        { borderColor: "#000", backgroundColor: "#000" }
                    ]}
                />
                <div className="flex justify-between text-sm text-dark mt-2">
                    <span>${price[0]}</span>
                    <span>${price[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default PriceRange;