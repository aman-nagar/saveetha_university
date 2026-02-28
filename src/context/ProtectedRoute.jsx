// src/context/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom"; // Add these imports
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // 1. Wait for AuthContext to finish loading from localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. 🔥 FIX: Strict Authentication Check
  if (!isAuthenticated) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  // 3. Strict Role Check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
