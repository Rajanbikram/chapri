import axiosInstance from "../../utils/axiosInstance";

export const updateSchedule = async (id, data) => {
  const res = await axiosInstance.put(`/owner/flights/${id}/schedule`, data);
  return res.data;
};