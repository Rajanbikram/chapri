import express from "express";
import { getSeatsByFlight } from "../../Controller/owner/ownerSeatController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.get("/:flightId", verifyToken, getSeatsByFlight);

export default router;