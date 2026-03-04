import express from "express";
import { getAllBookings } from "../../Controller/owner/ownerBookingController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getAllBookings);

export default router;