import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
    icon?: React.ReactNode;
    placeholder?: string;
    classes?: string;
}

function InputField({ icon, placeholder, classes }: InputFieldProps) {
    return (
        <div className={`${styles.inputWrapper} ${classes || styles.defaultBg}`}>
            {icon}
            <input
                type="text"
                placeholder={placeholder || "Search for products..."}
                className={styles.inputField}
            />
        </div>
    );
}

export default InputField;
