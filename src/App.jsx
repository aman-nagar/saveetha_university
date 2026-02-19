// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboardPanel";
import News from "./pages/public/News";
import SiteSettings from "./pages/admin/settings/SiteSettingsPanel";
import AddStudent from "./pages/admin/students/AddStudent";
import CourseCategoryPanel from "./pages/admin/courses/CourseCategoryPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* students */}
          <Route path="students/add" element={<AddStudent />} />
          {/* course category */}
          <Route path="course-category" element={<CourseCategoryPanel />} />
          {/* settings */}
          <Route path="site-settings" element={<SiteSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
