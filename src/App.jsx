import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Login from "./components/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route element={<PublicLayout />} />
        <Route path="/" element={<Home />} />
        {/* admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route index element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
