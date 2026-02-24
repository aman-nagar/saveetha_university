// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loginStudent, logoutStudent } from "../api/auth/studentAuthApi";
import { fetchStudentById } from "../api/students/studentApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from cookie + fetch user on startup
  useEffect(() => {
    const token = Cookies.get("authToken");
    const studentId = localStorage.getItem("studentId");

    if (token && studentId) {
      fetchUserData(token, studentId)
        .then((fetchedUser) => {
          setUser(fetchedUser);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginStudent(email, password);

    Cookies.set("authToken", data.token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    localStorage.setItem("studentId", data.student_id);

    setUser({
      id: data.student_id,
      name: data.candidate_name,
      enrollment_no: data.enrollment_no,
      father_name: data.father_name,
      mother_name: data.mother_name,
      dob: data.dob,
      photo: data.photo, // This now contains the full URL
      gender: data.gender,
      category: data.category,
      contact_number: data.contact_number,
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      address: data.address,
      pincode: data.pincode,
      status: data.status,
      role: "student",
    });
  };

  // Helper: Fetch user with token and id
  const fetchUserData = async (token, studentId) => {
    const data = await fetchStudentById(studentId);
    return {
      id: data.id,
      name: data.candidate_name,
      enrollment_no: data.enrollment_no,
      father_name: data.father_name,
      mother_name: data.mother_name,
      dob: data.dob,
      photo: data.photo, // This contains the full URL
      gender: data.gender,
      category: data.category,
      contact_number: data.contact_number,
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      address: data.address,
      pincode: data.pincode,
      status: data.status,
      role: "student",
    };
  };

  // Updated logout to call API
  const logout = async () => {
    try {
      const token = Cookies.get("authToken");
      if (token) {
        await logoutStudent(token).catch((err) => {
          console.warn(
            "Logout API failed, but continuing with local logout:",
            err,
          );
        });
      }
    } finally {
      // Always clear local state regardless of API success/failure
      setUser(null);
      Cookies.remove("authToken");
      localStorage.removeItem("studentId");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!Cookies.get("authToken"),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
