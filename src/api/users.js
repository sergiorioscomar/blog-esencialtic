import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const updateUserRole = async ({ id, role }) => {
  const res = await api.post(`/users/${id}/role`, { role });
  return res.data;
};

