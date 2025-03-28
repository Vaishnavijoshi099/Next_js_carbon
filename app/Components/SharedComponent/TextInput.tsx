'use client'
import React from "react";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Enter text",
  type = "text",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`text-input-container ${className}`}>
      {label && <label className="text-input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-input-field"
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
