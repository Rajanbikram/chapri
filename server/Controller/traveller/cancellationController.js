import Booking from "../../Model/traveller/Booking.js";
import Cancellation from "../../Model/traveller/Cancellation.js";
import Seat from "../../Model/traveller/Seat.js";

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    await booking.update({ status: "Cancelled" });
    await Seat.update({ isOccupied: false }, { where: { id: booking.seatId } });
    await Cancellation.create({ bookingId: booking.id });

    return res.status(200).json({ message: "Booking cancelled." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};