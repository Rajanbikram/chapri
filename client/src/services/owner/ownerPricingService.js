import axiosInstance from "../../utils/axiosInstance";

export const updatePrice = async (id, price) => {
  const res = await axiosInstance.put(`/owner/flights/${id}/price`, { price });
  return res.data;
};