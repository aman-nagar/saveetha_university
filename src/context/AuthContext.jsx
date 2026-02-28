// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    Cookies.set("authToken", userData.token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.clear(); // Wipes all user data completely
    setUser(null);
    // Optional: Redirect to portal immediately
    window.location.href = "/portal";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user, //Because user state is your real session indicator.
        // isAuthenticated: !!Cookies.get("authToken"),  //This re-evaluates every render.
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
