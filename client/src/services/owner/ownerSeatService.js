import axiosInstance from "../../utils/axiosInstance";

export const getSeatsByFlight = async (flightId) => {
  const res = await axiosInstance.get(`/owner/seats/${flightId}`);
  return res.data;
};