<<<<<<< Updated upstream
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
=======
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-black text-white shadow hover:bg-black/90",
    destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
    outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-100 text-black",
    secondary: "bg-gray-100 text-black shadow-sm hover:bg-gray-200",
    ghost: "bg-transparent hover:bg-gray-100 text-black",
    link: "text-blue-600 underline-offset-4 hover:underline bg-transparent",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-10 px-8 rounded-md",
    icon: "h-9 w-9",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = "",
            variant = "default",
            size = "default",
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        const baseClasses =
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const finalClassName = [
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return <Comp ref={ref} className={finalClassName} {...props} />;
    }
);

Button.displayName = "Button";

export { Button };
>>>>>>> Stashed changes
