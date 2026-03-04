import axiosInstance from "../../utils/axiosInstance";

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/owner/users");
  return res.data;
};

export const blockUser = async (id) => {
  const res = await axiosInstance.put(`/owner/users/${id}/block`);
  return res.data;
};

export const unblockUser = async (id) => {
  const res = await axiosInstance.put(`/owner/users/${id}/unblock`);
  return res.data;
};