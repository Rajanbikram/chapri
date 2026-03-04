import axiosInstance from "../../utils/axiosInstance";

export const cancelBooking = async (id) => {
  const res = await axiosInstance.put(`/bookings/${id}/cancel`);
  return res.data;
};