import React from "react";
import Input from "./Input";

interface InputGroupProps {
  label?: string;
  inputs: {
    id: string;
    label?: string;
    subtext?: string;
    placeholder?: string;
    as?: "input" | "select" | "textarea" | "date";
    type?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    variant?: "default" | "paper";
    wide?: boolean;
  }[];
  variant?: "default" | "paper";
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  inputs,
  variant = "default",
}) => {
  const isPaper = variant === "paper";

  return (
    <div className={isPaper ? "mb-4" : "mb-6"}>
      {isPaper && label && (
        <p className="mb-2 text-sm font-medium text-blue-900">
          {label}
          {inputs.some((input) => input.required) && (
            <span className="text-red-500"> *</span>
          )}
        </p>
      )}
      <div
        className={
          isPaper
            ? "grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-3 gap-3"
        }
      >
        {inputs.map((input) => {
          const { wide, label: inputLabel, ...inputProps } = input;
          return (
            <div
              key={input.id}
              className={
                isPaper && wide ? "sm:col-span-2 lg:col-span-3" : undefined
              }
            >
              <Input
                {...inputProps}
                label={isPaper && label ? undefined : inputLabel}
                variant={input.variant ?? variant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputGroup;
