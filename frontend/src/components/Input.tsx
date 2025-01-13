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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
  onChange,
  disabled = false,
}) => {
  const commonClasses =
    "mt-2 p-1 block lg:w-36 w-26 rounded-sm border shadow-sm focus:ring focus:border text-xs";
  const disabledClasses = "bg-gray-200 text-gray-500 cursor-not-allowed";
  const [dob, setDob] = useState(new Date());

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`block text-sm ${label ? "text-blue-800" : "invisible"}`}
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
          className={`${commonClasses} ${
            disabled ? disabledClasses : "border-blue-800"
          } ${className}`}
          required={required}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {as === "select" && options && (
        <select
          id={id}
          name={id}
          className={`${commonClasses} ${
            disabled ? disabledClasses : "border-blue-800"
          } ${className} w-36`}
          required={required}
          defaultValue={placeholder}
          disabled={disabled}
        >
          <option value="" disabled>
            Seleccione una opción
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
          className={`${commonClasses} ${
            disabled ? disabledClasses : "border-blue-800"
          } ${className}`}
          disabled={disabled}
        />
      )}

      {as === "date" && (
        <DatePicker
          showIcon
          selected={dob}
          onChange={(date) => setDob(date as Date)}
          dateFormat="dd/MM/yyyy"
          className={`${commonClasses} ${
            disabled ? disabledClasses : "border-blue-800"
          } ${className}`}
          placeholderText={placeholder}
          disabled={disabled}
        />
      )}
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
};

export default Input;
