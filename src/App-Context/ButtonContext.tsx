import { createContext, ReactNode } from "react";

export const ButtonContext = createContext({});

interface ButtonProviderProps {
  className: string;
  children: ReactNode;
}

const ButtonProvider = ({ className, children }: ButtonProviderProps) => {
  return (
    <>
      <ButtonContext.Provider value={className}>
        {children}
      </ButtonContext.Provider>
    </>
  );
};

export { ButtonProvider };
