import axiosInstance from "../../utils/axiosInstance";

export const getAllBookings = async (search = "", page = 0) => {
  const res = await axiosInstance.get(`/owner/bookings?search=${search}&page=${page}&limit=5`);
  return res.data;
};