'use client';
import React from 'react';

type InputFieldProps = {
  icon?: React.ReactNode;
  placeholder?: string;
  classes?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  classes,
  value,
  onChange,
}) => {
  return (
    <div
      className={`gap-2 items-center flex px-3 ${classes || 'bg-gray-100'
        } text-gray-600 rounded-full outline-none focus-within:ring-2`}
    >
      {icon}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search for products...'}
        className="flex-1 py-2 bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default InputField;
