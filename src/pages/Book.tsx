import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../customHooks/useAuth";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import Layout from "../components/Layout";

const Book = () => {
  // const { user, logout } = useAuth();

  return (
    <>
      <Layout>Buku</Layout>
    </>
  );
};

export default Book;
