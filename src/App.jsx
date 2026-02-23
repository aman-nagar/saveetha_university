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
import AddCenterPage from "./pages/admin/centers/AddCenterPage";
import CenterLayout from "./layouts/CenterLayout";
import CenterDashboardPage from "./pages/center/CenterDashboardPage";
import CenterListPage from "./pages/admin/centers/CenterListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public + Login */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Student (standalone for now) */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Admin – full access */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* course menu*/}
          <Route path="course-category" element={<CourseCategoryPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="stream" element={<StreamPage />} />
          {/* students menu */}
          <Route path="students" element={<StudentListPage />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          {/* centers menu */}
          <Route path="centers/add" element={<AddCenterPage />} />
          <Route path="centers" element={<CenterListPage />} />
          {/* settings menu */}
          <Route path="site-settings" element={<SiteSettingsPage />} />
        </Route>

        {/* Center role – limited access */}
        <Route path="/center" element={<CenterLayout />}>
          <Route path="dashboard" element={<CenterDashboardPage />} />
          {/* Add more later: subcenters/create, profile, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
