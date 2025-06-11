import React from "react";

interface InputFieldProps {
    icon?: React.ReactNode;
    placeholder?: string;
    classes?: string;
}

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, classes }) => {
    return (
        <div
            className={`flex gap-2 items-center flex-1 px-3 ${classes || "bg-gray-100"
                } text-gray-600 rounded-full outline-none focus-within:ring-2`}
        >
            {icon}
            <input
                type="text"
                placeholder={placeholder || "Search for products..."}
                className="py-2 bg-transparent w-full focus:outline-none focus:border-none"
            />
        </div>
    );
};

export default InputField;
