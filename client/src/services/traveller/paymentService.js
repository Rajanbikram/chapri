import axiosInstance from "../../utils/axiosInstance";

export const createPayment = async (data) => {
  const res = await axiosInstance.post("/payments", data);
  return res.data;
};