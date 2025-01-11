import { ChangeEvent } from "react";
import Input from "./Input";

interface SearchProps {
  value: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, handleSearch }: SearchProps) => {
  return (
    <>
      <Input
        type="text"
        name="search"
        value={value}
        className="border border-black w-4/12 bg-white"
        placeholder="Masukkan nama buku"
        onChange={(e) => handleSearch(e)}
      />
    </>
  );
};

export default Search;
