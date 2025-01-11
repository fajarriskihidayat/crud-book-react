import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center mt-10 mx-8 lg:mx-40 gap-3">
        {children}
      </div>
    </>
  );
};

export default Layout;
