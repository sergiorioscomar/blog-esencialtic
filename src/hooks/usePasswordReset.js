import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset, resetPassword } from "../api/password";

export function useForgotPassword() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
