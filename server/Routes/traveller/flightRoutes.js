import express from "express";
import { searchFlights, getFlightById } from "../../Controller/traveller/flightController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.get("/search", verifyToken, searchFlights);
router.get("/:id", verifyToken, getFlightById);

export default router;