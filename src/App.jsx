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
import SubjectPage from "./pages/admin/courses/SubjectPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import GenerateAdmitCardPage from "./pages/admin/students/GenerateAdmitCardPage";
import LoginPortal from "./pages/auth/LoginPortal";
import CenterLogin from "./pages/auth/CenterLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentLogin from "./pages/auth/StudentLogin";
import FormEnabledRoute from "./context/FormEnabledRoute";
import CreateResultPage from "./pages/admin/result/CreateResultPage";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/portal" element={<LoginPortal />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/center/login" element={<CenterLogin />} />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
            </Route>

            {/* Admin Section */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<StudentListPage />} />
              <Route path="students/add" element={<AddStudent />} />
              <Route path="students/edit/:id" element={<EditStudent />} />
              <Route path="centers/add" element={<AddCenterPage />} />
              <Route path="centers" element={<CenterListPage />} />
              <Route
                path="admit-card/generate"
                element={<GenerateAdmitCardPage />}
              />
              <Route path="results/create" element={<CreateResultPage />} />
              <Route path="course-category" element={<CourseCategoryPage />} />
              <Route path="faculty" element={<FacultyPage />} />
              <Route path="course" element={<CoursePage />} />
              <Route path="stream" element={<StreamPage />} />
              <Route path="subject" element={<SubjectPage />} />
              <Route path="site-settings" element={<SiteSettingsPage />} />
            </Route>

            {/* Center Section - FIXED: Added child routes for role silo */}
            <Route
              path="/center"
              element={
                <ProtectedRoute allowedRoles={["center"]}>
                  <CenterLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CenterDashboardPage />} />
              <Route path="students" element={<StudentListPage />} />
              <Route path="students/add" element={<AddStudent />} />

              <Route
                path="center/add"
                element={
                  <FormEnabledRoute>
                    <AddCenterPage />
                  </FormEnabledRoute>
                }
              />
            </Route>

            {/* Student Portal */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
