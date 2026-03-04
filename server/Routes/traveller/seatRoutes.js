import express from "express";
import { getSeatAvailability, getSeatsByFlight } from "../../Controller/traveller/seatController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.get("/availability", verifyToken, getSeatAvailability);
router.get("/:flightId", verifyToken, getSeatsByFlight);

export default router;