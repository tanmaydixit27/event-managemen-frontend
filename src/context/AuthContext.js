import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://event-management-backend-it09.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("❌ Auth verification failed:", error.response?.data?.message);
        localStorage.removeItem("token"); // ✅ Remove invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("https://event-management-backend-it09.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data?.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://event-management-backend-it09.onrender.com/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data?.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
