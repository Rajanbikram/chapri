import express from "express";
import { cancelFlight, delayFlight } from "../../Controller/owner/ownerCancellationController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.put("/:id/cancel", verifyToken, cancelFlight);
router.put("/:id/delay", verifyToken, delayFlight);

export default router;