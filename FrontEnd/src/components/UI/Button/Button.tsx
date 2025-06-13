import React from "react";

interface ButtonProps {
    classes?: string;
    title: string;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ classes = "", title, handleClick }: ButtonProps) {
    return (
        <button
            onClick={handleClick}
            className={` ${classes}  px-10 capitalize cursor-pointer transition-all duration-300 py-2 rounded-full  text-lg  `}
        >
            {title}
        </button>
    );
}

export default Button;