import { ChangeEvent, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IBook } from "../types";
import isLocation from "../utils/isLocation";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Book = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<IBook[]>();
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 2;

  const queryPage = parseInt(searchParams.get("p") || "1", 10);
  const queryKeyword = searchParams.get("k") || "";
  const [isQuery, setIsQuery] = useState({ page: "", keyword: "" });

  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentItems: IBook[] | undefined = filteredBooks?.slice(
    firstIndex,
    lastIndex
  );

  useEffect(() => {
    const booksStorage = localStorage.getItem("books");
    const datas: IBook[] = booksStorage ? JSON.parse(booksStorage) : [];

    setBooks(datas);
    setFilteredBooks(datas);
  }, []);

  useEffect(() => {
    setCurrentPage(queryPage);
  }, [queryPage, queryKeyword]);

  useEffect(() => {
    if (queryKeyword) {
      const filtered = books
        ?.sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .filter((book) =>
          book.nama.toLowerCase().includes(queryKeyword.toLowerCase())
        );

      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books?.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    }
  }, [searchParams, books]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    if (value) {
      setSearchParams({ p: "1", k: value });
    } else {
      setSearchParams({});
    }

    setIsQuery({ ...isQuery, keyword: value });
  };

  const handlePage = (page: number) => {
    if (queryKeyword) {
      setSearchParams({ p: page.toString(), k: queryKeyword });
      setIsQuery({ ...isQuery, page: page.toString() });
    } else {
      if (page !== 1) {
        setSearchParams({ p: page.toString() });
        setIsQuery({ ...isQuery, page: page.toString() });
      } else {
        setSearchParams({});
        setIsQuery({ ...isQuery, page: page.toString() });
      }

      setCurrentPage(page);
    }
  };

  return (
    <Layout>
      {isLocation("/") ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-black dark:text-white">
              Book
            </h1>
            <button
              className="px-2 py-1 bg-green-600 text-white text-sm tracking-wide rounded-md flex items-center gap-1"
              onClick={() => navigate("/create")}
            >
              Add Book
            </button>
          </div>

          <div className="relative w-full h-[400px] bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-lg flex flex-col gap-y-5">
            <div className="flex justify-end">
              <Search value={queryKeyword} handleSearch={handleSearch} />
            </div>

            <div className="overflow-auto">
              <Table
                datas={books}
                currentItems={currentItems}
                setBooks={setBooks}
                setFilteredBooks={setFilteredBooks}
              />
            </div>

            <div className="absolute bottom-6 w-full flex justify-center">
              {filteredBooks && (
                <Pagination
                  totalItems={filteredBooks.length}
                  itemsPerPage={itemPerPage}
                  currentPage={currentPage}
                  setCurrentPage={handlePage}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <Outlet context={{ books, setBooks, isQuery }} />
      )}
    </Layout>
  );
};

export default Book;
