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
  variant?: "default" | "paper";
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
  variant = "default",
}) => {
  const isPaper = variant === "paper";
  const [dob, setDob] = useState<Date | null>(null);

  const commonClasses = isPaper
    ? "mt-1 block w-full border-0 border-b border-blue-900/40 bg-transparent px-1 py-2 text-sm text-blue-950 shadow-none outline-none transition-colors focus:border-amber-500 focus:ring-0"
    : "mt-2 block w-26 rounded-sm border p-1 text-xs shadow-sm focus:border focus:ring lg:w-52";

  const disabledClasses = isPaper
    ? "cursor-not-allowed border-slate-300 text-slate-400"
    : "cursor-not-allowed bg-gray-200 text-gray-500";

  const enabledBorder = isPaper ? "" : "border-blue-800";

  const fieldClass = `${commonClasses} ${
    disabled ? disabledClasses : enabledBorder
  } ${className}`;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) return;
    onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDateChange = (date: Date | null) => {
    setDob(date);
    if (!onChange) return;
    const syntheticEvent = {
      target: {
        name: id,
        value: date ? date.toISOString().slice(0, 10) : "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className={`flex flex-col ${isPaper ? "w-full" : ""}`}>
      {(label || !isPaper) && (
        <label
          htmlFor={id}
          className={`block text-sm ${
            label
              ? isPaper
                ? "font-medium text-blue-900"
                : "text-blue-800"
              : "invisible"
          }`}
        >
          {label || "Placeholder"}{" "}
          {required && label && <span className="text-red-500">*</span>}
        </label>
      )}
      {!label && isPaper && required && (
        <span className="sr-only">Required</span>
      )}

      {as === "input" && (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          className={fieldClass}
          required={required}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {as === "select" && options && (
        <select
          id={id}
          name={id}
          className={`${fieldClass} ${isPaper ? "w-full" : "w-36"}`}
          required={required}
          defaultValue={placeholder || ""}
          disabled={disabled}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            {placeholder && placeholder !== "DO"
              ? placeholder
              : "Seleccione una opción"}
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
          className={fieldClass}
          disabled={disabled}
        />
      )}

      {as === "date" && (
        <DatePicker
          showIcon={!isPaper}
          selected={dob}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className={fieldClass}
          placeholderText={placeholder}
          disabled={disabled}
          name={id}
          wrapperClassName={isPaper ? "w-full" : undefined}
        />
      )}
      {subtext && (
        <p
          className={`text-xs ${
            isPaper ? "mt-1 text-slate-500" : "text-gray-500"
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};

export default Input;
