import axiosInstance from "../../utils/axiosInstance";

export const getAllFlights = async () => {
  const res = await axiosInstance.get("/owner/flights");
  return res.data;
};

export const addFlight = async (data) => {
  const res = await axiosInstance.post("/owner/flights", data);
  return res.data;
};