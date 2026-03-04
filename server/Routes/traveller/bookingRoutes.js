import express from "express";
import { createBooking, getMyBookings, rescheduleBooking } from "../../Controller/traveller/bookingController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/my", verifyToken, getMyBookings);
router.put("/:id/reschedule", verifyToken, rescheduleBooking);

export default router;