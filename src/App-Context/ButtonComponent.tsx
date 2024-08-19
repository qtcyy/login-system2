import { MouseEventHandler, ReactNode, useContext } from "react";
import { ButtonContext } from "./ButtonContext";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  const context = useContext(ButtonContext);

  return (
    <button {...context} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
