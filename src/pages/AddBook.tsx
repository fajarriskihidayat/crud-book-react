import { ChangeEvent, FormEvent, useState } from "react";
import Form from "../components/Form";
import { IBook, IBookOutletContext } from "../types";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const { books, setBooks } = useOutletContext<IBookOutletContext>();

  const [data, setData] = useState<IBook>({
    nama: "",
    jenis: "",
    tahun: "",
    penerbit: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      if (
        data.nama === "" ||
        data.jenis === "" ||
        data.tahun === "" ||
        data.penerbit === ""
      ) {
        setIsLoading(false);
        setError("Data tidak boleh kosong");
        return;
      }

      const newBook: IBook = {
        id: books.length > 0 ? (books[books.length - 1].id ?? 0) + 1 : 1,
        nama: data?.nama,
        jenis: data?.jenis,
        tahun: data?.tahun,
        penerbit: data?.penerbit,
      };

      const datas: IBook[] = [...books, newBook];
      localStorage.setItem("books", JSON.stringify(datas));

      setBooks(datas);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Create Book</h1>

      <div className="w-full h-full bg-white p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
        {error ? <p className="text-red-600">{error}</p> : ""}
        <Form
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddBook;
