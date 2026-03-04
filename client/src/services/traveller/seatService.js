import axiosInstance from "../../utils/axiosInstance";

export const getSeatAvailability = async () => {
  const res = await axiosInstance.get("/seats/availability");
  return res.data;
};

export const getSeatsByFlight = async (flightId) => {
  const res = await axiosInstance.get(`/seats/${flightId}`);
  return res.data;
};