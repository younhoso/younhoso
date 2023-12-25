import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
