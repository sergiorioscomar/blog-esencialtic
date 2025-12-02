import api from "./api";

export const requestPasswordReset = async ({ email }) => {
  const res = await api.post("/forgot-password", { email });
  return res.data;
};

export const resetPassword = async ({ email, token, password, password_confirmation }) => {
  const payload = { email, token, password, password_confirmation };
  const res = await api.post("/reset-password", payload);
  return res.data;
};
