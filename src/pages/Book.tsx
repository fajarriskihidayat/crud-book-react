import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IBook } from "../types";
import isLocation from "../utils/isLocation";

const Book = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>();

  useEffect(() => {
    const booksStorage = localStorage.getItem("books");
    const datas = booksStorage ? JSON.parse(booksStorage) : [];

    setBooks(datas);
  }, []);

  return (
    <Layout>
      {isLocation("/") ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Book</h1>
            <button
              className="px-2 py-1 bg-green-600 text-white text-sm tracking-wide rounded-md flex items-center gap-1"
              onClick={() => navigate("/create")}
            >
              Add Book
            </button>
          </div>

          <div className="w-full h-full bg-neutral-100 p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
            <div className="overflow-auto">
              {books && <Table datas={books} setBooks={setBooks} />}
            </div>
          </div>
        </>
      ) : (
        <Outlet context={{ books, setBooks }} />
      )}
    </Layout>
  );
};

export default Book;
