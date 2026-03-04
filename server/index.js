import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connection } from "./database/db.js";

// Models — import order matters!
import "./Model/auth/User.js";
import "./Model/traveller/flight.js";
import "./Model/traveller/Seat.js";
import "./Model/traveller/Booking.js";
import "./Model/traveller/Payment.js";
import "./Model/traveller/Cancellation.js";

// Routes
import authRoutes from "./Routes/auth/authRoutes.js";
import flightRoutes from "./Routes/traveller/flightRoutes.js";
import seatRoutes from "./Routes/traveller/seatRoutes.js";
import bookingRoutes from "./Routes/traveller/bookingRoutes.js";
import paymentRoutes from "./Routes/traveller/paymentRoutes.js";
import cancellationRoutes from "./Routes/traveller/cancellationRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bookings", cancellationRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connection();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});