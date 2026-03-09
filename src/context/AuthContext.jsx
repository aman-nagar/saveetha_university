// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null); // Store full student data from login API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedUser = localStorage.getItem("authUser");
    const storedStudentData = localStorage.getItem("studentData");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Restore student data if it was stored
      if (storedStudentData) {
        setStudentData(JSON.parse(storedStudentData));
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    return new Promise((resolve) => {
      Cookies.set("authToken", userData.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      localStorage.setItem("authUser", JSON.stringify(userData));

      // For student role, store the entire response data
      if (userData.role === "student" && userData.student_id) {
        localStorage.setItem("studentData", JSON.stringify(userData));
        setStudentData(userData);
      }

      setUser(userData);

      // Resolve immediately so the component can proceed
      resolve(userData);
    });
  };

  const logout = async () => {
    try {
      // 1. Call the backend based on current user role
      if (user?.role === "admin") await logoutAdmin();
      else if (user?.role === "center") await logoutCenter();
      else if (user?.role === "student") await logoutStudent();
    } catch (error) {
      console.error(
        "Backend logout failed, clearing local session anyway",
        error,
      );
    } finally {
      // 2. Always clear local data even if API fails
      Cookies.remove("authToken");
      localStorage.clear();
      setUser(null);
      setStudentData(null);

      // 3. Redirect to the central portal
      window.location.href = "/portal";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentData,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
