import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { IBook, IBookOutletContext } from "../types";
import Form from "../components/Form";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { books, setBooks, isQuery } = useOutletContext<IBookOutletContext>();

  const [data, setData] = useState<IBook>({
    nama: "",
    jenis: "",
    tahun: "",
    penerbit: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const booksStorage = localStorage.getItem("books");
    const datas: IBook[] = booksStorage ? JSON.parse(booksStorage) : [];
    const book = datas.find((item) => item.id == id);

    setData({
      nama: book ? book.nama : "",
      jenis: book ? book.jenis : "",
      tahun: book ? book.tahun : "",
      penerbit: book ? book.penerbit : "",
    });
  }, []);

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

      const updateBook: IBook[] = books.map((book) =>
        book.id == id
          ? {
              ...book,
              nama: data?.nama,
              jenis: data?.jenis,
              tahun: data?.tahun,
              penerbit: data?.penerbit,
            }
          : book
      );

      localStorage.setItem("books", JSON.stringify(updateBook));

      setBooks(updateBook);
      setIsLoading(false);
      navigate(
        isQuery?.keyword
          ? `/?p=${isQuery?.page}&k=${isQuery?.keyword}`
          : isQuery?.page == "1" || isQuery?.page == ""
          ? "/"
          : `/?p=${isQuery?.page}`
      );
    }, 1000);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Edit Book</h1>

      <div className="w-full h-full bg-white p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
        {error ? <p className="text-red-600">{error}</p> : ""}
        <Form
          data={data}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default EditBook;
