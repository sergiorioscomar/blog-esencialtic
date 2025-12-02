import api from "./api";

export const getServiceHires = async () => {
  const res = await api.get("/service-hires");
  return res.data;
};

export const updateServiceHireStatus = async ({ serviceId, userId, status }) => {
  const res = await api.put(`/service-hires/${serviceId}/${userId}/status`, {
    quote_status: status,
  });
  return res.data;
};

export const deleteServiceHire = async ({ serviceId, userId }) => {
  const res = await api.delete(`/service-hires/${serviceId}/${userId}`);
  return res.data;
};

export const sendServiceQuote = async ({ serviceId, userId, price }) => {
  const res = await api.post("/cotizaciones/enviar", {
    service_id: serviceId,
    user_id: userId,
    price,
  });
  return res.data;
};
