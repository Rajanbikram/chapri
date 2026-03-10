import axiosInstance from "../../utils/axiosInstance.js";

export const getOwnerStats = async () => {
  const res = await axiosInstance.get("/owner/stats");
  return res.data;
};