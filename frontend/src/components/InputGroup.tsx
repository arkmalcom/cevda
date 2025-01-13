import React from "react";
import Input from "./Input";

interface InputGroupProps {
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
  }[];
}

const InputGroup: React.FC<InputGroupProps> = ({ inputs }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-3">
        {inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
      </div>
    </div>
  );
};

export default InputGroup;
