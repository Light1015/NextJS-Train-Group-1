"use client";

import React, { useState } from "react";
import style from "./ColorList.module.scss";

interface ColorsListProps {
    colors: string[];
}

function ColorsList({ colors }: ColorsListProps) {
    const [selectedColor, setSelectedColor] = useState("olive");

    return (
        <div className={style.wrapper}>
            {colors.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`${style.colorCircle} ${selectedColor === color ? style.active : ""}`}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
}

export default ColorsList;
