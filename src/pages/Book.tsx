import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IBook } from "../types";
import isLocation from "../utils/isLocation";
import Pagination from "../components/Pagination";

const Book = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 2;

  useEffect(() => {
    const booksStorage = localStorage.getItem("books");
    const datas = booksStorage ? JSON.parse(booksStorage) : [];

    setBooks(datas);
  }, []);

  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentItems = books?.slice(firstIndex, lastIndex);

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

          <div className="relative w-full h-[400px] bg-neutral-100 p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
            <div className="overflow-auto">
              {books && (
                <Table
                  datas={books}
                  currentItems={currentItems}
                  setBooks={setBooks}
                />
              )}
            </div>

            <div className="absolute bottom-6 w-full flex justify-center">
              {books && (
                <Pagination
                  totalItems={books.length}
                  itemsPerPage={itemPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
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
