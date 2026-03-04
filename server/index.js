import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connection } from "./database/db.js";

// Models
import "./Model/auth/User.js";
import "./Model/traveller/flight.js";
import "./Model/traveller/Seat.js";
import "./Model/traveller/Booking.js";
import "./Model/traveller/Payment.js";
import "./Model/traveller/Cancellation.js";
import "./Model/owner/FlightDelay.js";

// Auth Routes
import authRoutes from "./Routes/auth/authRoutes.js";

// Traveller Routes
import flightRoutes from "./Routes/traveller/flightRoutes.js";
import seatRoutes from "./Routes/traveller/seatRoutes.js";
import bookingRoutes from "./Routes/traveller/bookingRoutes.js";
import paymentRoutes from "./Routes/traveller/paymentRoutes.js";
import cancellationRoutes from "./Routes/traveller/cancellationRoutes.js";

// Owner Routes
import ownerFlightRoutes from "./Routes/owner/ownerFlightRoutes.js";
import ownerScheduleRoutes from "./Routes/owner/ownerScheduleRoutes.js";
import ownerPricingRoutes from "./Routes/owner/ownerPricingRoutes.js";
import ownerSeatRoutes from "./Routes/owner/ownerSeatRoutes.js";
import ownerBookingRoutes from "./Routes/owner/ownerBookingRoutes.js";
import ownerCancellationRoutes from "./Routes/owner/ownerCancellationRoutes.js";
import ownerUserRoutes from "./Routes/owner/ownerUserRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoutes);

// Traveller
app.use("/api/flights", flightRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bookings", cancellationRoutes);

// Owner
app.use("/api/owner/flights", ownerFlightRoutes);
app.use("/api/owner/flights", ownerScheduleRoutes);
app.use("/api/owner/flights", ownerPricingRoutes);
app.use("/api/owner/seats", ownerSeatRoutes);
app.use("/api/owner/bookings", ownerBookingRoutes);
app.use("/api/owner/flights", ownerCancellationRoutes);
app.use("/api/owner/users", ownerUserRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connection();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});