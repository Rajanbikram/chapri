import dotenv from "dotenv";
dotenv.config();                              // ← SABAI BHANDA MAATHI

import express from "express";
import cors from "cors";
import { connection } from "./database/db.js";
import "./Model/auth/User.js";
import authRoutes from "./Routes/auth/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connection();
  console.log("🚀 Server running on http://localhost:" + PORT);
});