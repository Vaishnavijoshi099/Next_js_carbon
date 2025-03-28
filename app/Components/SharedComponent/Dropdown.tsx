'use client'
import React from "react";

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className = "" }) => {
  return (
    <select className={`custom-dropdown ${className}`} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
