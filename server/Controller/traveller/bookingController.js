import Booking from "../../Model/traveller/Booking.js";
import Flight from "../../Model/traveller/flight.js";
import Seat from "../../Model/traveller/Seat.js";

export const createBooking = async (req, res) => {
  try {
    const { flightId, seatId, totalAmount } = req.body;
    const userId = req.user.id;

    await Seat.update({ isOccupied: true }, { where: { id: seatId } });

    const booking = await Booking.create({ userId, flightId, seatId, totalAmount });
    return res.status(201).json({ message: "Booking confirmed.", booking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Flight, attributes: ["flightNo", "from", "to", "date", "price"] },
        { model: Seat, attributes: ["seatNo"] },
      ],
    });
    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

export const rescheduleBooking = async (req, res) => {
  try {
    const { newDate } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    await Flight.update({ date: newDate }, { where: { id: booking.flightId } });
    return res.status(200).json({ message: "Booking rescheduled." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};