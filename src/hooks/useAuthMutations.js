// src/hooks/useAuthMutations.js
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

// Hook para login
export function useLogin() {
  const { login: setAuth } = useAuth();
  
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      // Actualiza el contexto de autenticación
      setAuth(res.data.token, res.data.user);
    },
  });
}

// Hook para registro
export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

