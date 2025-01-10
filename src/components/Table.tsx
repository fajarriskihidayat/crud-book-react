import { FaRegTrashAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IBook } from "../types";
import { Dispatch, SetStateAction } from "react";

interface TableProps {
  datas: IBook[] | undefined;
  currentItems: IBook[] | undefined;
  setBooks: Dispatch<SetStateAction<IBook[] | undefined>>;
}

const Table = ({ datas, currentItems, setBooks }: TableProps) => {
  const handleDelete = (id: number | undefined) => {
    const books: IBook[] = datas ? datas.filter((data) => data.id !== id) : [];
    localStorage.setItem("books", JSON.stringify(books));

    setBooks(books);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="py-3 px-6 w-[250px] bg-white text-left">Nama</th>
          <th className="py-3 px-6 w-[250px] bg-white text-left">Jenis</th>
          <th className="py-3 px-6 w-[250px] bg-white text-left">Tahun</th>
          <th className="py-3 px-6 w-[250px] bg-white text-left">Penerbit</th>
          <th className="py-3 px-6 w-[250px] bg-white text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item, i) => (
            <tr className="border-b border-gray-300" key={i}>
              <td className="py-4 px-6">{item.nama}</td>
              <td className="py-4 px-6">{item.jenis}</td>
              <td className="py-4 px-6">{item.tahun}</td>
              <td className="py-4 px-6">{item.penerbit}</td>
              <td className="py-4 px-6 flex gap-1">
                <Link
                  to={`/edit/${item.id}`}
                  className="px-2 py-1 bg-yellow-500 text-white text-sm tracking-wide rounded-md flex items-center gap-1"
                >
                  <RiPencilFill color="#fff" /> Edit
                </Link>
                <button
                  className="px-2 py-1 bg-red-500 text-white text-sm tracking-wide rounded-md flex items-center gap-1"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaRegTrashAlt color="#fff" /> Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="py-4 text-center">
              Book Not Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
