import { ReactNode } from "react";
import { createContext } from "react";

const InputContext = createContext({ className: "" });

interface InputProviderProps {
  className: string;
  children: ReactNode;
}

const InputProvider = ({ className, children }: InputProviderProps) => {
  return (
    <InputContext.Provider value={{ className: className }}>
      {children}
    </InputContext.Provider>
  );
};

export { InputContext, InputProvider };
