import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return <div className="text-black dark:text-white">{children}</div>;
};

export default Label;
