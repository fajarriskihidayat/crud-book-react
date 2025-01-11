import { ChangeEvent, FormEvent } from "react";
import { IBook } from "../types";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

interface FormProps {
  data?: IBook | null;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form = ({ data, isLoading, handleChange, handleSubmit }: FormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <Label>Nama Buku</Label>
          <Input
            type="text"
            name="nama"
            value={data?.nama}
            placeholder="Masukkan nama buku"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Label>Jenis Buku</Label>
          <Input
            type="text"
            name="jenis"
            value={data?.jenis}
            placeholder="Masukkan jenis buku"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Label>Tahun Terbit</Label>
          <Input
            type="number"
            name="tahun"
            value={data?.tahun}
            placeholder="Masukkan tahun terbit"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Label>Penerbit</Label>
          <Input
            type="text"
            name="penerbit"
            value={data?.penerbit}
            placeholder="Masukkan penerbit"
            className="w-full"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-full flex gap-2 justify-center">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
