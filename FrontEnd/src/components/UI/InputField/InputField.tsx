'use client';

import React from 'react';

type InputFieldProps = {
    icon?: React.ReactNode;
    placeholder?: string;
    classes?: string;
};

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, classes }) => {
    return (
        <div
            className={`gap-2 items-center flex px-3 ${classes ? classes : 'bg-gray-100'
                } text-gray-600 rounded-full outline-none focus-within:ring-2`}
        >
            {icon}
            <input
                type="text"
                placeholder={placeholder || 'Search for products...'}
                className="flex-1 py-2 bg-transparent focus:outline-none"
            />
        </div>
    );
};

export default InputField;
