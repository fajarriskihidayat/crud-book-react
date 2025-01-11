import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import {
  MdArrowDropDown,
  MdOutlineAccountCircle,
  MdOutlineWbSunny,
} from "react-icons/md";
import { RiComputerLine, RiMoonFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { MENU } from "../utils/constant";
import Button from "./Button";
import useTheme from "../customHooks/useTheme";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [theme, setTheme] = useTheme();
  const [isModeDropdown, setIsModeDropdown] = useState(false);
  console.log(theme);

  return (
    <nav className="flex flex-col">
      <div className="px-8 h-[60px] md:px-14 md:h-[70px] flex items-center justify-between bg-white dark:bg-black shadow-sm">
        <NavLink to="/">
          <div className="text-black dark:text-white text-xl">Dashboard</div>
        </NavLink>
        <div
          className="text-3xl md:hidden flex items-center"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? (
            <IoClose color={theme === "light" ? "#000" : "#fff"} />
          ) : (
            <IoMenu color={theme === "light" ? "#000" : "#fff"} />
          )}
        </div>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-x-8">
            {MENU.map((item, i) => (
              <li className="font-semibold text-md tracking-wide" key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black dark:text-white border-b-2 border-b-black dark:border-b-white"
                      : "text-gray-400 dark:text-neutral-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="font-semibold text-md tracking-wide">
              <div
                className="flex items-center justify-center gap-1 w-24 px-2 py-1 cursor-pointer border border-black dark:border-white rounded-sm"
                onClick={() => setIsModeDropdown(!isModeDropdown)}
              >
                {theme === "light" ? (
                  <MdOutlineWbSunny
                    size={20}
                    color={theme === "light" ? "#000" : "#fff"}
                  />
                ) : theme === "dark" ? (
                  <RiMoonFill
                    size={20}
                    color={theme === "dark" ? "#fff" : "#000"}
                  />
                ) : (
                  <RiComputerLine
                    size={20}
                    color={theme === "system" ? "#fff" : "#000"}
                  />
                )}
                <span className="text-black dark:text-white">
                  {theme.toUpperCase()}
                </span>
              </div>
              {isModeDropdown && (
                <div className="bg-white absolute w-32 p-3 rounded-lg shadow-sm z-50 right-44 top-14 text-black">
                  <div className="flex flex-col gap-1 cursor-pointer">
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setTheme("light")}
                    >
                      <MdOutlineWbSunny color="#000" size={20} />
                      <span>Light</span>
                    </div>
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setTheme("dark")}
                    >
                      <RiMoonFill color="#000" size={20} />
                      <span>Dark</span>
                    </div>
                    <div
                      className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                      onClick={() => setTheme("system")}
                    >
                      <RiComputerLine color="#000" size={20} />
                      <span>System</span>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="font-semibold text-md tracking-wide relative">
              <div
                className="flex items-center gap-1 text-black dark:text-white cursor-pointer"
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              >
                <MdOutlineAccountCircle
                  color={theme === "light" ? "#000" : "fff"}
                  size={28}
                />
                {user?.fullName ? user.fullName : user?.username}
                <MdArrowDropDown
                  color={theme === "light" ? "#000" : "fff"}
                  size={28}
                  className="ml-[-6px]"
                />
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
          className={`md:hidden absolute w-full duration-500 z-[100] bg-white dark:bg-black shadow-sm ${
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
                      ? "text-black dark:text-white border-b-2 border-b-black dark:border-b-white"
                      : "text-gray-400 dark:text-neutral-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <div className="flex  gap-4">
              <li className="px-3 py-2 font-bold">
                <div
                  className="flex items-center justify-center gap-1 w-24 px-2 py-1 cursor-pointer border border-black dark:border-white rounded-sm"
                  onClick={() => setIsModeDropdown(!isModeDropdown)}
                >
                  {theme === "light" ? (
                    <MdOutlineWbSunny
                      size={20}
                      color={theme === "light" ? "#000" : "#fff"}
                    />
                  ) : theme === "dark" ? (
                    <RiMoonFill
                      size={20}
                      color={theme === "dark" ? "#fff" : "#000"}
                    />
                  ) : (
                    <RiComputerLine
                      size={20}
                      color={theme === "light" ? "#000" : "#fff"}
                    />
                  )}
                  <span className="text-black dark:text-white">
                    {theme.toUpperCase()}
                  </span>
                </div>
                {isModeDropdown && (
                  <div className="bg-white absolute w-32 p-3 rounded-lg shadow-sm z-50 left-3 top-33 text-black">
                    <div className="flex flex-col gap-1 cursor-pointer">
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setTheme("light")}
                      >
                        <MdOutlineWbSunny color="#000" size={20} />
                        <span>Light</span>
                      </div>
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setTheme("dark")}
                      >
                        <RiMoonFill color="#000" size={20} />
                        <span>Dark</span>
                      </div>
                      <div
                        className="w-full p-2 border border-black flex items-center gap-1 hover:bg-neutral-100"
                        onClick={() => setTheme("system")}
                      >
                        <RiComputerLine color="#000" size={20} />
                        <span>System</span>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="px-3 py-2 font-bold">
                <div
                  className="flex items-center gap-1 text-black dark:text-white cursor-pointer"
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  <MdOutlineAccountCircle
                    color={theme === "light" ? "#000" : "fff"}
                    size={28}
                  />
                  {user?.fullName}
                  <MdArrowDropDown
                    color={theme === "light" ? "#000" : "fff"}
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
