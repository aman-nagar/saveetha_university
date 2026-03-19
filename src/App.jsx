// src/App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ===== LAYOUTS =====
import AdminLayout from "@/layouts/AdminLayout";
import CenterLayout from "@/layouts/CenterLayout";
import StudentLayout from "@/layouts/StudentLayout";
import PublicLayout from "@/layouts/PublicLayout";

// ===== CONTEXT & PROVIDERS =====
import { AuthProvider } from "@/context/AuthContext";
import { PublicDataProvider } from "@/context/PublicDataContext";
import ProtectedRoute from "@/context/ProtectedRoute";
import FormEnabledRoute from "@/context/FormEnabledRoute";
import { ToastProvider } from "@/context/ToastContext";

// ===== CONSTANTS =====
import { ROUTES } from "@/constants/routes";

// ===== PUBLIC PAGES =====
const Home = lazy(() => import("@/pages/public/Home"));
const About = lazy(() => import("@/pages/public/About"));
const Contact = lazy(() => import("@/pages/public/Contact"));
const News = lazy(() => import("@/pages/public/News"));
const AcademicsPage = lazy(() => import("@/pages/public/AcademicsPage"));
const GalleryPage = lazy(() => import("@/pages/public/GalleryPage"));
const WIEP = lazy(() => import("@/pages/public/WIEP-formPage"));
const ApplyAdmissionPage = lazy(
  () => import("@/pages/public/ApplyAdmissionPage"),
);

// ===== AUTH PAGES =====
const LoginPortal = lazy(() => import("@/pages/auth/LoginPortal"));
const AdminLogin = lazy(() => import("@/pages/auth/AdminLogin"));
const CenterLogin = lazy(() => import("@/pages/auth/CenterLogin"));
const StudentLogin = lazy(() => import("@/pages/auth/StudentLogin"));

// ===== ADMIN PAGES =====
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboardPage"));
const StudentListPage = lazy(
  () => import("@/pages/admin/students/StudentListPage"),
);
const AddStudent = lazy(() => import("@/pages/admin/students/AddStudent"));
const EditStudent = lazy(() => import("@/pages/admin/students/EditStudent"));
const GenerateAdmitCardPage = lazy(
  () => import("@/pages/admin/students/GenerateAdmitCardPage"),
);
const CenterListPage = lazy(
  () => import("@/pages/admin/centers/CenterListPage"),
);
const AddCenterPage = lazy(() => import("@/pages/admin/centers/AddCenterPage"));
const CourseCategoryPage = lazy(
  () => import("@/pages/admin/courses/CourseCategoryPage"),
);
const FacultyPage = lazy(() => import("@/pages/admin/courses/FacultyPage"));
const CoursePage = lazy(() => import("@/pages/admin/courses/CoursePage"));
const StreamPage = lazy(() => import("@/pages/admin/courses/StreamPage"));
const SubjectPage = lazy(() => import("@/pages/admin/courses/SubjectPage"));
const SiteSettingsPage = lazy(
  () => import("@/pages/admin/settings/SiteSettingsPage"),
);
const CreateResultPage = lazy(
  () => import("@/pages/admin/result/CreateResultPage"),
);

// ===== CENTER PAGES  =====
const CenterDashboardPage = lazy(
  () => import("@/pages/center/CenterDashboardPage"),
);

// ===== STUDENT PAGES  =====
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const StudentIDCardPage = lazy(
  () => import("@/pages/student/StudentIDCardPage"),
);
const StudentAdmitCardPage = lazy(
  () => import("@/pages/student/StudentAdmitCardPage"),
);
const StudentResultPage = lazy(
  () => import("@/pages/student/StudentResultPage"),
);

// ===== ERROR PAGES =====
const UnauthorizedPage = lazy(() => import("@/pages/UnauthorizedPage"));

// ===== LOADING FALLBACK =====
import LoadingFallback from "@/components/ui/LoadingFallback";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <PublicDataProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback variant="dashboard" />}>
              <Routes>
                {/* ===== AUTH ROUTES ===== */}
                <Route path={ROUTES.AUTH.PORTAL} element={<LoginPortal />} />
                <Route
                  path={ROUTES.AUTH.STUDENT_LOGIN}
                  element={<StudentLogin />}
                />
                <Route
                  path={ROUTES.AUTH.ADMIN_LOGIN}
                  element={<AdminLogin />}
                />
                <Route
                  path={ROUTES.AUTH.CENTER_LOGIN}
                  element={<CenterLogin />}
                />

                {/* ===== PUBLIC ROUTES ===== */}
                <Route element={<PublicLayout />}>
                  <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
                  <Route path={ROUTES.PUBLIC.ABOUT} element={<About />} />
                  <Route path={ROUTES.PUBLIC.CONTACT} element={<Contact />} />
                  <Route path={ROUTES.PUBLIC.NEWS} element={<News />} />
                  <Route
                    path={ROUTES.PUBLIC.ACADEMICS}
                    element={<AcademicsPage />}
                  />
                  <Route
                    path={ROUTES.PUBLIC.GALLERY}
                    element={<GalleryPage />}
                  />
                  <Route
                    path={ROUTES.PUBLIC.APPLY_FRANCHISE}
                    element={<WIEP />}
                  />
                  <Route
                    path={ROUTES.PUBLIC.APPLY_ADMISSION}
                    element={<ApplyAdmissionPage />}
                  />
                </Route>

                {/* ===== ADMIN ROUTES ===== */}
                <Route
                  path={ROUTES.ADMIN.DASHBOARD}
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
                  <Route
                    path="course-category"
                    element={<CourseCategoryPage />}
                  />
                  <Route path="faculty" element={<FacultyPage />} />
                  <Route path="course" element={<CoursePage />} />
                  <Route path="stream" element={<StreamPage />} />
                  <Route path="subject" element={<SubjectPage />} />
                  <Route path="site-settings" element={<SiteSettingsPage />} />
                </Route>

                {/* ===== CENTER ROUTES ===== */}
                <Route
                  path={ROUTES.CENTER.DASHBOARD}
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

                {/* ===== STUDENT ROUTES ===== */}
                <Route
                  path={ROUTES.STUDENT.DASHBOARD}
                  element={
                    <ProtectedRoute allowedRoles={["student"]}>
                      <StudentLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<StudentDashboard />} />
                  <Route path="id-card" element={<StudentIDCardPage />} />
                  <Route path="admit-card" element={<StudentAdmitCardPage />} />
                  <Route path="results" element={<StudentResultPage />} />
                </Route>

                {/* ===== ERROR ROUTES ===== */}
                <Route
                  path={ROUTES.ERROR.UNAUTHORIZED}
                  element={<UnauthorizedPage />}
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PublicDataProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
