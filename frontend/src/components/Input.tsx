import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputProps {
  id: string;
  label?: string;
  subtext?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  as?: "input" | "select" | "textarea" | "date";
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  subtext,
  placeholder,
  type = "text",
  required = false,
  options,
  as = "input",
  className = "",
}) => {
  const commonClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500";
  const [dob, setDob] = useState(new Date());
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          label ? "text-blue-800" : "invisible"
        }`}
      >
        {label || "Placeholder"}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      {as === "input" && (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          className={`${commonClasses} ${className}`}
          required={required}
        />
      )}

      {as === "select" && options && (
        <select
          id={id}
          name={id}
          className={`${commonClasses} ${className}`}
          required={required}
          defaultValue={placeholder}
        >
          <option value="" disabled>
            {placeholder || "Seleccione una opción"}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "textarea" && (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          className={`${commonClasses} ${className}`}
        />
      )}

      {as === "date" && (
        <DatePicker
            showIcon
            selected={dob}
            onChange={(date) => setDob(date as Date)}
          dateFormat="dd/MM/yyyy"
          className={`${commonClasses} ${className}`}
          placeholderText={placeholder}
          
        />
      )}
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
};

export default Input;
