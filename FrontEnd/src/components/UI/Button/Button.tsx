import React from "react";

interface ButtonProps {
    classes?: string;
    title: string;
    handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ classes = "", title, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className={`btn ${classes} px-4 py-2 text-lg rounded-pill text-capitalize transition-all`}
        >
            {title}
        </button>
    );
};

export default Button;
