import Flight from "../../Model/traveller/flight.js";
import Seat from "../../Model/traveller/Seat.js";

export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [{ model: Seat, attributes: ["id", "isOccupied"] }],
    });
    const data = flights.map((f) => ({
      id: f.id,
      flightNo: f.flightNo,
      airline: f.airline,
      from: f.from,
      to: f.to,
      dep: f.dep,
      arr: f.arr,
      aircraft: f.aircraft || "Boeing 737",
      status: f.status || "On Time",
      price: f.price,
      totalSeats: f.Seats?.length || 0,
      bookedSeats: f.Seats?.filter((s) => s.isOccupied).length || 0,
    }));
    return res.status(200).json({ flights: data });
  } catch (error) {
    console.error("getAllFlights error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const addFlight = async (req, res) => {
  try {
    const { flightNo, aircraft, from, to, dep, arr } = req.body;
    if (!flightNo || !from || !to || !dep || !arr)
      return res.status(400).json({ message: "All fields are required." });

    const flight = await Flight.create({
      flightNo,
      airline: "Vayu Airways",
      from,
      to,
      dep,
      arr,
      aircraft: aircraft || "Boeing 737",
      price: 4500,
      date: new Date(),
      status: "On Time",
    });
    return res.status(201).json({ message: "Flight added successfully.", flight });
  } catch (error) {
    console.error("addFlight error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};