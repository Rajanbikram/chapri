import axiosInstance from "../../utils/axiosInstance";

export const searchFlights = async (from, to, date) => {
  const res = await axiosInstance.get(`/flights/search?from=${from}&to=${to}&date=${date}`);
  return res.data;
};

export const getFlightById = async (id) => {
  const res = await axiosInstance.get(`/flights/${id}`);
  return res.data;
};