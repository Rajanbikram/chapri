import express from "express";
import { cancelBooking } from "../../Controller/traveller/cancellationController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.put("/:id/cancel", verifyToken, cancelBooking);

export default router;