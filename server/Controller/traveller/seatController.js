import Seat from "../../Model/traveller/Seat.js";
import Flight from "../../Model/traveller/flight.js";

export const getSeatAvailability = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [{ model: Seat, attributes: ["id", "seatNo", "isOccupied"] }],
    });

    const availability = flights.map((f) => {
      const total = f.Seats.length;
      const booked = f.Seats.filter((s) => s.isOccupied).length;
      return {
        id: f.flightNo,
        route: `${f.from} → ${f.to}`,
        total,
        booked,
      };
    });

    return res.status(200).json({ availability });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

export const getSeatsByFlight = async (req, res) => {
  try {
    const seats = await Seat.findAll({ where: { flightId: req.params.flightId } });
    return res.status(200).json({ seats });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};