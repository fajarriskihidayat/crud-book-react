import { Dispatch, SetStateAction } from "react";

export interface IBook {
  id?: number;
  nama: string;
  jenis: string;
  tahun: string;
  penerbit: string;
}

export interface IBookOutletContext {
  books: IBook[];
  setBooks: Dispatch<SetStateAction<IBook[] | undefined>>;
}
