// src/context/FormEnabledRoute
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function FormEnabledRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user?.is_form_enabled === false) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
