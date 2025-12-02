import api from "./api";

export const getServiceHires = async () => {
  const res = await api.get("/service-hires");
  return res.data;
};
