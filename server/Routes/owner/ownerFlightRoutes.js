import express from "express";
import { getAllFlights, addFlight } from "../../Controller/owner/ownerFlightController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getAllFlights);
router.post("/", verifyToken, addFlight);

export default router;