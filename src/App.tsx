import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import User from "./pages/Setting";
import Book from "./pages/Book";

function App() {
  return (
    <div className="bg-neutral-100 h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="" element={<Book />} />
          <Route path="/setting" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
