import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="w-full bg-neutral-100 p-3 rounded-lg focus:outline-black"
      {...props}
    />
  );
};

export default Input;
