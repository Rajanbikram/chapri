import Booking from "../../Model/traveller/Booking.js";
import Flight from "../../Model/traveller/flight.js";
import Seat from "../../Model/traveller/Seat.js";
import User from "../../Model/auth/User.js";

export const getAllBookings = async (req, res) => {
  try {
    const { search = "", page = 0, limit = 5 } = req.query;

    const bookings = await Booking.findAll({
      include: [
        { model: Flight, attributes: ["flightNo", "from", "to"] },
        { model: Seat, attributes: ["seatNo"] },
        { model: User, attributes: ["name", "email"] },
      ],
    });

    const mapped = bookings.map((b) => ({
      id: b.id,
      name: b.User?.name || "Unknown",
      email: b.User?.email || "",
      flight: b.Flight?.flightNo || "",
      seat: b.Seat?.seatNo || "",
      status: b.status,
    }));

    const filtered = search
      ? mapped.filter(
          (b) =>
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.flight.toLowerCase().includes(search.toLowerCase())
        )
      : mapped;

    const offset = parseInt(page) * parseInt(limit);
    const paged = filtered.slice(offset, offset + parseInt(limit));

    return res.status(200).json({
      bookings: paged,
      total: filtered.length,
      page: parseInt(page),
    });
  } catch (error) {
    console.error("getAllBookings error:", error);
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};