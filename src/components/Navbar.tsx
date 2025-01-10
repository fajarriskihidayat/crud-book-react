import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MENU } from "../utils/constant";
import { useAuth } from "../customHooks/useAuth";
import {
  MdArrowDropDown,
  MdOutlineAccountCircle,
  MdOutlineWbSunny,
} from "react-icons/md";
import Button from "./Button";
import { RiComputerLine, RiMoonFill } from "react-icons/ri";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [isMode, setIsMode] = useState("System");
  const [isModeDropdown, setIsModeDropdown] = useState(false);

  return (
    <nav className="flex flex-col">
      <div className="px-8 h-[60px] md:px-14 md:h-[70px] flex items-center justify-between bg-white shadow-sm">
        <NavLink to="/">
          <div className="text-black text-xl">Dashboard</div>
        </NavLink>
        <div
          className="text-3xl md:hidden flex items-center"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <IoClose color="#000" /> : <IoMenu color="#000" />}
        </div>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-x-8">
            {MENU.map((item, i) => (
              <li className="font-semibold text-md tracking-wide" key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black border-b-2 border-b-black"
                      : "text-gray-400"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="font-semibold text-md tracking-wide">
              <div
                className="flex items-center justify-center gap-1 w-24 px-2 py-1 cursor-pointer border border-black rounded-sm"
                onClick={() => setIsModeDropdown(!isModeDropdown)}
              >
                {isMode === "System" ? (
                  <RiComputerLine size={20} />
                ) : isMode === "Light" ? (
                  <MdOutlineWbSunny size={20} />
                ) : (
                  <RiMoonFill size={20} />
                )}
                <span>{isMode}</span>
              </div>
              {isModeDropdown && (
                <div className="bg-white absolute w-32 p-3 rounded-lg shadow-sm z-50 right-44 top-14 text-black">
                  <div className="flex flex-col gap-1 cursor-pointer">
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setIsMode("System")}
                    >
                      <RiComputerLine color="#000" size={20} />
                      <span>System</span>
                    </div>
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setIsMode("Light")}
                    >
                      <MdOutlineWbSunny color="#000" size={20} />
                      <span>Light</span>
                    </div>
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setIsMode("Dark")}
                    >
                      <RiMoonFill color="#000" size={20} />
                      <span>Dark</span>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="font-semibold text-md tracking-wide relative">
              <div
                className="flex items-center gap-1 text-black cursor-pointer"
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              >
                <MdOutlineAccountCircle color="#000" size={28} />
                {user?.fullName ? user.fullName : user?.username}
                <MdArrowDropDown color="#000" size={28} className="ml-[-6px]" />
              </div>
              {isOpenDropdown && (
                <div className="bg-white absolute w-40 p-3 rounded-lg shadow-sm z-50 -right-8 top-8 text-black">
                  <Button onClick={logout}>Logout</Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative">
        <nav
          className={`md:hidden absolute w-full duration-500 z-[100] bg-white shadow-sm ${
            isOpenMenu ? "block" : "hidden"
          }`}
        >
          <ul className="pl-4 pt-3 pb-8">
            {MENU.map((item, i) => (
              <li className="px-3 py-2 font-bold" key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black border-b-2 border-b-black"
                      : "text-neutral-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <div className="flex  gap-4">
              <li className="px-3 py-2 font-bold">
                <div
                  className="flex items-center justify-center gap-1 w-24 px-2 py-1 cursor-pointer border border-black rounded-sm"
                  onClick={() => setIsModeDropdown(!isModeDropdown)}
                >
                  {isMode === "System" ? (
                    <RiComputerLine size={20} />
                  ) : isMode === "Light" ? (
                    <MdOutlineWbSunny size={20} />
                  ) : (
                    <RiMoonFill size={20} />
                  )}
                  <span>{isMode}</span>
                </div>
                {isModeDropdown && (
                  <div className="bg-white absolute w-32 p-3 rounded-lg shadow-sm z-50 left-3 top-33 text-black">
                    <div className="flex flex-col gap-1 cursor-pointer">
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setIsMode("System")}
                      >
                        <RiComputerLine color="#000" size={20} />
                        <span>System</span>
                      </div>
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setIsMode("Light")}
                      >
                        <MdOutlineWbSunny color="#000" size={20} />
                        <span>Light</span>
                      </div>
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setIsMode("Dark")}
                      >
                        <RiMoonFill color="#000" size={20} />
                        <span>Dark</span>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="px-3 py-2 font-bold">
                <div
                  className="flex items-center gap-1 text-black cursor-pointer"
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  <MdOutlineAccountCircle color="#000" size={28} />
                  {user?.fullName ? user.fullName : user?.username}
                  <MdArrowDropDown
                    color="#000"
                    size={28}
                    className="ml-[-6px]"
                  />
                </div>
                {isOpenDropdown && (
                  <div className="bg-white absolute w-40 p-3 rounded-lg shadow-sm z-50 left-32 top-46 text-black shadow-lg">
                    <Button onClick={logout}>Logout</Button>
                  </div>
                )}
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
