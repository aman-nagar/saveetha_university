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
import SiteSettingsPage from "./pages/admin/settings/SiteSettingsPage";
import AddStudent from "./pages/admin/students/AddStudent";
import CourseCategoryPage from "./pages/admin/courses/CourseCategoryPage";
import FacultyPage from "./pages/admin/courses/FacultyPage";
import CoursePage from "./pages/admin/courses/CoursePage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StreamPage from "./pages/admin/courses/StreamPage";

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

        {/* students */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          {/* students */}
          <Route path="students/add" element={<AddStudent />} />

          {/* course category */}
          <Route path="course-category" element={<CourseCategoryPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="stream" element={<StreamPage />} />

          {/* settings */}
          <Route path="site-settings" element={<SiteSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
