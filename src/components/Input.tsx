import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`w-full bg-neutral-100 p-3 rounded-lg focus:outline-black ${className}`}
      {...props}
    />
  );
};

export default Input;
