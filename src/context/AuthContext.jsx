// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { logoutAdmin } from "../api/auth/adminAuthApi";
import { logoutCenter } from "../api/auth/centerAuthApi";
import { logoutMember } from "../api/auth/memberAuthApi";
import { logoutStudent } from "../api/auth/studentAuthApi";

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
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.role === "student" && storedStudentData) {
          setStudentData(JSON.parse(storedStudentData));
        } else {
          setStudentData(null);
        }
      } catch (error) {
        Cookies.remove("authToken");
        localStorage.removeItem("authUser");
        localStorage.removeItem("studentData");
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      const authToken =
        userData?.token || userData?.access_token || userData?.authToken;

      if (!authToken) {
        reject(new Error("Authentication token missing from login response."));
        return;
      }

      const normalizedUser = {
        ...userData,
        token: authToken,
      };

      Cookies.set("authToken", authToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      localStorage.setItem("authUser", JSON.stringify(normalizedUser));

      // For student role, store the entire response data
      if (normalizedUser.role === "student" && normalizedUser.student_id) {
        localStorage.setItem("studentData", JSON.stringify(normalizedUser));
        setStudentData(normalizedUser);
      } else {
        localStorage.removeItem("studentData");
        setStudentData(null);
      }

      setUser(normalizedUser);

      // Resolve immediately so the component can proceed
      resolve(normalizedUser);
    });
  };

  const logout = async () => {
    try {
      // 1. Call the backend based on current user role
      if (user?.role === "admin") await logoutAdmin();
      else if (user?.role === "center") await logoutCenter();
      else if (user?.role === "student") await logoutStudent();
      else if (user?.role === "member") await logoutMember();
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
