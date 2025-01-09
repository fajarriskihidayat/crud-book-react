import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="bg-neutral-100 h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
