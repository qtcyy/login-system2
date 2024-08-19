import { ChangeEventHandler, KeyboardEventHandler, useContext } from "react";
import { InputContext } from "./InputContext";

interface InputProps {
  value: string;
  type: string;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ value, type, onKeyDown, onChange }: InputProps) => {
  const context = useContext(InputContext);

  return (
    <input
      {...context}
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export { Input };
