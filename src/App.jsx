// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
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
import SubCenterDashboardPage from "./pages/sub-center/SubCenterDashboardPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import SubjectPage from "./pages/admin/courses/SubjectPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Public + Login */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
          </Route>

          {/* Admin – full access */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            {/* course menu*/}
            <Route path="course-category" element={<CourseCategoryPage />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="course" element={<CoursePage />} />
            <Route path="stream" element={<StreamPage />} />
            <Route path="subject" element={<SubjectPage />} />
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
            <Route index element={<CenterDashboardPage />} />
          </Route>
          {/* Sub-center */}
          <Route path="/sub-center" element={<CenterLayout />}>
            <Route index element={<SubCenterDashboardPage />} />
          </Route>

          {/* Student (standalone for now) */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Optional: Fallback for unauthorized access */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// Quick unauthorized page (add this as src/pages/Unauthorized.jsx)
function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-danger">Unauthorized Access</h1>
        <p className="text-muted">
          You don't have permission to view this page.
        </p>
        <a href="/login" className="text-primary underline">
          Go to Login
        </a>
      </div>
    </div>
  );
}
