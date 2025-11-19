// src/api/auth.js
import api from "./api";

export function login(credentials) {
  return api.post("/login", credentials);
}

export function register(data) {
  return api.post("/register", data);
}
