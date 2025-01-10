import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  fullName: string;
  username: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      setUser(JSON.parse(userStorage));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data: IUser) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ fullName: data.fullName, username: data.username })
    );
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    setUser,
  };
};
