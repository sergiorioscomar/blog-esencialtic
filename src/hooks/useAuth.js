// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import api from "../api/api";

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
  }, []);

  const saveAuth = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  async function login({ email, password }) {
    const res = await api.post("/api/login", { email, password });
    const token = res.data.token || res.data.access_token || res.data.data?.token;
    const userData = res.data.user || res.data.data?.user || res.data;
    if (!token) throw new Error("No token recibido del backend");
    saveAuth(token, userData);
    return userData;
  }

  async function register({ name, email, password, password_confirmation }) {
    const res = await api.post("/api/register", { name, email, password, password_confirmation });
    const token = res.data.token || res.data.access_token || res.data.data?.token;
    const userData = res.data.user || res.data.data?.user || res.data;
    if (!token) throw new Error("No token recibido del backend");
    saveAuth(token, userData);
    return userData;
  }

  return { user, login, register, logout: clearAuth };
}
