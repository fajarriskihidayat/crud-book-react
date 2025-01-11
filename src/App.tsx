import { Route, Routes } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import Login from "./pages/Login";
import User from "./pages/Setting";
import PrivateRoutes from "./utils/PrivateRoutes";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Book />}>
            <Route path="create" element={<AddBook />} />
            <Route path="edit/:id" element={<EditBook />} />
          </Route>
          <Route path="/setting" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
