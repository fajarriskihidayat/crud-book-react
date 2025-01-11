import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useTheme = (): [string, Dispatch<SetStateAction<string>>] => {
  const themeStorage = localStorage.getItem("theme");

  const [theme, setTheme] = useState(themeStorage ? themeStorage : "system");

  const element = document.documentElement;
  const darkQuery = window.matchMedia("prefers-color-schema: dark");

  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      !("theme" in localStorage && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  useEffect(() => {
    onWindowMatch();
  }, []);

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  useEffect(() => {
    const changeHandler = (e: MediaQueryListEvent) => {
      if (!("theme" in localStorage)) {
        if (e.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    };

    darkQuery.addEventListener("change", changeHandler);

    return () => {
      darkQuery.removeEventListener("change", changeHandler);
    };
  }, []);

  return [theme, setTheme];
};

export default useTheme;
