import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`bg-neutral-100 p-3 rounded-lg focus:outline-black border-black dark:border-white w-4/12 bg-white dark:bg-black text-black dark:text-white ${className}`}
      {...props}
    />
  );
};

export default Input;
