'use client'
import React, { useState } from "react";
import { TextInput as CarbonTextInput, Button } from "@carbon/react"; // Import Carbon's TextInput and Button

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
  const [ButtonVisible, setButtonVisible] = useState(false);


  // Show button if input is not empty
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setButtonVisible(event.target.value.length > 0); // Show button when text exists
  };

  return (
    <div className={`text-input-container ${className}`}>
      <CarbonTextInput
        id="custom-text-input"
        labelText={label}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className="text-input-field"
      />
      

      {ButtonVisible && (
        <Button kind="primary" className="text-input-button">
          Submit
        </Button>
      )}
    </div>
  );
};

export default TextInput;
