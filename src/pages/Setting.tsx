import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import Layout from "../components/Layout";
import { useAuth } from "../customHooks/useAuth";

const Setting = () => {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFullName(user && user?.fullName);
  }, [user?.fullName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!fullName) {
        setIsLoading(false);
        setError("Data tidak boleh kosong");
        return;
      }

      updateUser({
        ...user!,
        fullName,
      });

      setFullName(fullName);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Setting</h1>
      </div>

      <div className="relative w-full h-[400px] bg-neutral-100 p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
        {error ? <p className="text-red-600">{error}</p> : ""}
        <form onSubmit={handleSubmit}>
          <Label>Nama Lengkap</Label>
          <Input
            type="text"
            name="fullname"
            value={fullName ? fullName : ""}
            placeholder="Masukkan nama lengkap"
            className="w-full bg-white"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Button type="submit">{isLoading ? "Loading..." : "Simpan"}</Button>
        </form>
      </div>
    </Layout>
  );
};

export default Setting;
