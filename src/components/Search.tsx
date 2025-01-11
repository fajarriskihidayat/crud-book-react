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
        className="border w-6/12 lg:w-4/12"
        placeholder="Masukkan nama buku"
        onChange={(e) => handleSearch(e)}
      />
    </>
  );
};

export default Search;
