import Seat from "../../Model/traveller/Seat.js";
import Flight from "../../Model/traveller/flight.js";

export const getSeatsByFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    const seats = await Seat.findAll({ where: { flightId: req.params.flightId } });
    return res.status(200).json({ seats, flight });
  } catch (error) {
    console.error("getSeatsByFlight error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};