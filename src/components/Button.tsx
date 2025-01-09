import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full bg-black rounded-lg text-white p-2 hover:bg-opacity-80 mt-4"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
