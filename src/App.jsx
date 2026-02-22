// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import News from "./pages/public/News";
import SiteSettingsPage from "./pages/admin/settings/SiteSettingsPage";
import AddStudent from "./pages/admin/students/AddStudent";
import EditStudent from "./pages/admin/students/EditStudent";
import CourseCategoryPage from "./pages/admin/courses/CourseCategoryPage";
import FacultyPage from "./pages/admin/courses/FacultyPage";
import CoursePage from "./pages/admin/courses/CoursePage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StreamPage from "./pages/admin/courses/StreamPage";
import StudentListPage from "./pages/admin/students/StudentListPage";

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

          {/* admin course category */}
          <Route path="course-category" element={<CourseCategoryPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="stream" element={<StreamPage />} />

          {/* admin students */}
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="students" element={<StudentListPage />} />

          {/* settings */}
          <Route path="site-settings" element={<SiteSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
