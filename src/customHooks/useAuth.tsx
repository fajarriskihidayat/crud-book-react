import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  fullName: string;
  username: string;
  password?: string;
}

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (data: IUser) => void;
  logout: () => void;
  updateUser: (updatedUser: IUser) => void;
}

interface AuthProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      const parsedUser = JSON.parse(userStorage);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data: IUser) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const updateUser = (updatedUser: IUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
