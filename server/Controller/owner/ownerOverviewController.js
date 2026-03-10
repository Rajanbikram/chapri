import Flight from "../../Model/traveller/flight.js";
import Booking from "../../Model/traveller/Booking.js";
import Seat from "../../Model/traveller/Seat.js";
import Payment from "../../Model/traveller/Payment.js";

export const getOwnerStats = async (req, res) => {
  try {
    // Active flights count
    const activeFlights = await Flight.count({
      where: { status: "On Time" }
    });

    // Total passengers (confirmed bookings)
    const totalPassengers = await Booking.count({
      where: { status: "Confirmed" }
    });

    // Monthly revenue (sum of all payments)
    const payments = await Payment.findAll();
    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // Avg occupancy
    const totalSeats = await Seat.count();
    const bookedSeats = await Seat.count({ where: { isOccupied: true } });
    const avgOccupancy = totalSeats > 0
      ? Math.round((bookedSeats / totalSeats) * 100)
      : 0;

    return res.status(200).json({
      activeFlights,
      totalPassengers,
      monthlyRevenue: totalRevenue,
      avgOccupancy,
    });
  } catch (error) {
    console.error("getOwnerStats error:", error);
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};