import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return <div className="text-black">{children}</div>;
};

export default Label;
