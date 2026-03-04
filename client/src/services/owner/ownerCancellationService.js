import axiosInstance from "../../utils/axiosInstance";

export const cancelFlight = async (id) => {
  const res = await axiosInstance.put(`/owner/flights/${id}/cancel`);
  return res.data;
};

export const delayFlight = async (id, reason) => {
  const res = await axiosInstance.put(`/owner/flights/${id}/delay`, { reason });
  return res.data;
};