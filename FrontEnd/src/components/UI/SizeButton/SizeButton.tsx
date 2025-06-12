"use client";

import React, { useState } from "react";
import styles from "./SizeButton.module.scss";

interface SizeButtonProps {
    sizes: string[];
}

function SizeButton({ sizes }: SizeButtonProps) {
    const [currentSize, setCurrentSize] = useState("Large");

    return (
        <div className={styles.wrapper}>
            {sizes.map((size) => (
                <button
                    key={size}
                    type="button"
                    onClick={() => setCurrentSize(size)}
                    className={`${styles.sizeBtn} ${currentSize === size ? styles.active : styles.inactive}`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}

export default SizeButton;
