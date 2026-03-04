import axiosInstance from "../../utils/axiosInstance";

export const createBooking = async (data) => {
  const res = await axiosInstance.post("/bookings", data);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await axiosInstance.get("/bookings/my");
  return res.data;
};

export const rescheduleBooking = async (id, newDate) => {
  const res = await axiosInstance.put(`/bookings/${id}/reschedule`, { newDate });
  return res.data;
};