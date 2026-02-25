// src/context/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();

  // 1. Wait for the AuthContext to finish checking localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. If they don't have a token, kick them to login
  if (!isAuthenticated) {
    if (window.location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  // 3. Optional: Role-Based checking (If a student tries to go to /admin)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // or redirect to their own dashboard
  }

  // 4. If all checks pass, render the requested page (e.g., StudentDashboard)
  return children;
}
