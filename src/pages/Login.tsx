import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import { useAuth } from "../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();
  const [data, setData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      if (!data.username || !data.password) {
        setError("Data masih kosong");
        setIsLoading(false);
        return;
      } else if (data.username !== "admin" && data.password !== "admin123") {
        setError("Username atau Password salahd");
        setIsLoading(false);
        return;
      }

      login({ ...data, fullName: user ? user.fullName : "Admin" });

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] flex flex-col gap-4 px-4 py-10 sm:p-10  bg-white dark:bg-neutral-800 rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
          Login
        </h1>
        <p className="text-red-500">{error}</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Masukkan username"
              className="w-full"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Masukkan password"
              className="w-full"
              onChange={handleChange}
            />
          </div>
          <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
