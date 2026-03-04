import Flight from "../../Model/traveller/flight.js";
import Cancellation from "../../Model/traveller/Cancellation.js";
import FlightDelay from "../../Model/owner/FlightDelay.js";
import Booking from "../../Model/traveller/Booking.js";
import Seat from "../../Model/traveller/Seat.js";

export const cancelFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    await flight.update({ status: "Cancelled" });

    const bookings = await Booking.findAll({ where: { flightId: req.params.id } });
    for (const booking of bookings) {
      await booking.update({ status: "Cancelled" });
      await Seat.update({ isOccupied: false }, { where: { id: booking.seatId } });
      await Cancellation.create({ bookingId: booking.id, reason: "Flight cancelled by airline" });
    }

    return res.status(200).json({ message: `Flight ${flight.flightNo} cancelled.` });
  } catch (error) {
    console.error("cancelFlight error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const delayFlight = async (req, res) => {
  try {
    const { reason } = req.body;
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    await flight.update({ status: "Delayed" });
    await FlightDelay.create({ flightId: flight.id, reason: reason || "Operational delay" });

    return res.status(200).json({ message: `Flight ${flight.flightNo} marked as delayed.` });
  } catch (error) {
    console.error("delayFlight error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};